import {useEffect, useMemo, useState} from 'react';

import {Button, Form, Modal, Select, Skeleton, Steps, Tabs, Tag} from 'antd';

import YAML from 'yaml';

import {ApiItem, ServiceItem, useDeployApi} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setApis} from '@redux/reducers/main';
import {closeApiDeployModal} from '@redux/reducers/ui';

import {ErrorLabel} from '@components/AntdCustom';

import * as S from './styled';

const {TabPane} = Tabs;

const {Option} = Select;

const ApiDeployModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const apis = useAppSelector(state => state.main.apis);
  const services = useAppSelector(state => state.main.services);

  const [activeStep, setActiveStep] = useState<number>(1);
  const [apiContent, setApiContent] = useState<{name: string; namespace: string; openapi: {[key: string]: any}}>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [selectedService, setSelectedService] = useState<ServiceItem>();
  const [upstreamReference, setUpstreamReference] = useState<string>('service');

  const {mutate: deployAPI} = useDeployApi({});

  const selectedServicePorts = useMemo(() => {
    if (!selectedService) {
      return [];
    }

    return selectedService.ports?.map(port => port.port);
  }, [selectedService]);

  const [form] = Form.useForm();

  const onCancelHandler = () => {
    dispatch(closeApiDeployModal());
  };

  const onDeployHandler = () => {
    if (!apiContent) {
      return;
    }

    form.validateFields().then(values => {
      const deployedOpenApiSpec = {
        ...apiContent.openapi,
        'x-kusk': {...apiContent.openapi['x-kusk'], upstream: {...values.upstream}},
      };

      const body = {
        name: apiContent.name,
        namespace: apiContent.namespace,
        openapi: YAML.stringify(deployedOpenApiSpec),
      };

      deployAPI(body)
        .then((response: any) => {
          const apiData: ApiItem = response;

          dispatch(setApis([...apis, apiData]));
          dispatch(closeApiDeployModal());
        })
        .catch(err => {
          setErrorMessage(err.data);
        });
    });
  };

  const onNextHandler = () => {
    form.validateFields().then(values => {
      const {name, namespace, openapi} = values;

      setApiContent({
        name,
        namespace: namespace || 'default',
        openapi: YAML.parse(JSON.parse(JSON.stringify(openapi))),
      });
      setActiveStep(1);
    });
  };

  const onServiceSelectClearHandler = () => {
    setSelectedService(undefined);
  };

  const onServiceSelectHandler = (service: ServiceItem) => {
    setSelectedService(service);
  };

  useEffect(() => {
    if (selectedService) {
      form.setFieldsValue({
        upstream: {service: {name: selectedService.name, namespace: selectedService.namespace, port: undefined}},
      });

      return;
    }

    form.resetFields();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService]);

  useEffect(() => {
    setErrorMessage('');

    if (!activeStep && apiContent) {
      form.setFieldsValue({
        name: apiContent.name,
        namespace: apiContent.namespace,
        openapi: YAML.stringify(apiContent.openapi),
      });
    } else {
      if (!activeStep || !apiContent) {
        return;
      }

      const upstreamService = apiContent.openapi['x-kusk']?.upstream?.service;

      if (upstreamService) {
        form.setFieldsValue({
          upstream: {
            service: {name: upstreamService.name, namespace: upstreamService.namespace, port: upstreamService.port},
          },
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  return (
    <Modal
      footer={
        activeStep ? (
          <>
            <Button onClick={() => setActiveStep(0)}>Back</Button>
            <Button type="primary" onClick={onDeployHandler}>
              Deploy
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={onNextHandler}>
            Next
          </Button>
        )
      }
      title="Deploy New API"
      visible
      width="800px"
      onCancel={onCancelHandler}
    >
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical" current={activeStep}>
            <S.Step title="API Content" />
            <S.Step title="Upstream" />
          </Steps>
        </S.StepsContainer>

        <div>
          <Form
            form={form}
            initialValues={{openapi: ''}}
            layout="vertical"
            onValuesChange={() => {
              if (errorMessage) {
                setErrorMessage('');
              }
            }}
          >
            {activeStep === 0 ? (
              <>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {required: true, message: 'Enter API name!'},
                    {pattern: /^[a-z0-9]$|^([a-z0-9\-])*[a-z0-9]$/, message: 'Wrong pattern!'},
                    {max: 63, type: 'string', message: 'Name is too long!'},
                    () => {
                      return {
                        validator(_, value) {
                          const namespace = form.getFieldValue('namespace') || 'default';

                          if (checkDuplicateAPI(apis, `${namespace}-${value}`)) {
                            return Promise.reject(new Error(`API name is already used in ${namespace} namespace!`));
                          }

                          return Promise.resolve();
                        },
                      };
                    },
                  ]}
                >
                  <S.Input placeholder="Enter API name" type="text" />
                </Form.Item>

                <Form.Item label="Namespace" name="namespace">
                  <S.Input
                    placeholder="Enter API namespace"
                    type="text"
                    onChange={() => {
                      if (form.getFieldValue('name')) {
                        form.validateFields(['name']);
                      }
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="OpenAPI Spec"
                  name="openapi"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your API content!',
                    },
                    () => {
                      return {
                        validator(_, value) {
                          if (typeof YAML.parse(JSON.parse(JSON.stringify(value))) === 'object') {
                            return Promise.resolve();
                          }

                          return Promise.reject(new Error('Please enter a valid API content!'));
                        },
                      };
                    },
                  ]}
                >
                  <S.Textarea rows={10} placeholder="Enter OpenAPI Spec in YAML/JSON format" />
                </Form.Item>
              </>
            ) : (
              <S.ExtensionContainer>
                <Tabs defaultActiveKey={upstreamReference} onChange={key => setUpstreamReference(key)}>
                  <TabPane tab="Service" key="service">
                    {services.isLoading ? (
                      <Skeleton.Button />
                    ) : services.error ? (
                      <ErrorLabel>{services.error}</ErrorLabel>
                    ) : (
                      <Form.Item label="Cluster service" name="service">
                        <S.Select
                          allowClear
                          placeholder="Select cluster service"
                          showSearch
                          onClear={onServiceSelectClearHandler}
                          onSelect={(value: any, option: any) => {
                            onServiceSelectHandler(option.service);
                          }}
                        >
                          {services.items.map(serviceItem => (
                            <Option key={`${serviceItem.namespace}-${serviceItem.name}`} service={serviceItem}>
                              <Tag>{serviceItem.namespace}</Tag>
                              {serviceItem.name}
                            </Option>
                          ))}
                        </S.Select>
                      </Form.Item>
                    )}

                    <Form.Item
                      label="Name"
                      name={['upstream', 'service', 'name']}
                      rules={[{required: true, message: 'Please enter name!'}]}
                    >
                      <S.Input disabled={Boolean(selectedService)} />
                    </Form.Item>

                    <Form.Item
                      label="Namespace"
                      name={['upstream', 'service', 'namespace']}
                      rules={[{required: true, message: 'Please enter namespace!'}]}
                    >
                      <S.Input disabled={Boolean(selectedService)} />
                    </Form.Item>

                    <Form.Item
                      label="Port"
                      name={['upstream', 'service', 'port']}
                      rules={[
                        {required: true, message: `Please ${selectedService ? 'choose' : 'enter'} a valid port!`},
                      ]}
                    >
                      {selectedService ? (
                        <S.Select placeholder="Select port">
                          {selectedServicePorts.map(port => (
                            <Option key={port} value={port}>
                              {port}
                            </Option>
                          ))}
                        </S.Select>
                      ) : (
                        <S.Input type="number" />
                      )}
                    </Form.Item>
                  </TabPane>

                  <TabPane tab="Host" key="host">
                    <Form.Item
                      label="Hostname"
                      name={['upstream', 'host', 'hostname']}
                      rules={[{required: true, message: 'Please enter hostname!'}]}
                    >
                      <S.Input placeholder="e.g. example.com" />
                    </Form.Item>

                    <Form.Item
                      label="Port"
                      name={['upstream', 'host', 'port']}
                      rules={[{required: true, message: 'Please enter port!'}]}
                    >
                      <S.Input type="number" />
                    </Form.Item>
                  </TabPane>
                </Tabs>

                <S.ExtensionSubHeading>Rewrite</S.ExtensionSubHeading>
                <Form.Item
                  label="Pattern"
                  name={['upstream', 'rewrite', 'rewrite_regex', 'pattern']}
                  rules={[{required: true, message: 'Please enter pattern!'}]}
                >
                  <S.Input />
                </Form.Item>

                <Form.Item
                  label="Substitution"
                  name={['upstream', 'rewrite', 'rewrite_regex', 'substitution']}
                  rules={[{required: true, message: 'Please enter substitution!'}]}
                >
                  <S.Input />
                </Form.Item>
              </S.ExtensionContainer>
            )}
          </Form>

          {errorMessage && <ErrorLabel>*{errorMessage}</ErrorLabel>}
        </div>
      </S.Container>
    </Modal>
  );
};

const checkDuplicateAPI = (apis: ApiItem[], apiKey: string) =>
  apis.find(api => `${api.namespace}-${api.name}` === apiKey);

export default ApiDeployModal;
