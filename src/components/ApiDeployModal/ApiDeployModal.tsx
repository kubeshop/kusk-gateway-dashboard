import {useEffect, useMemo, useState} from 'react';

import {Button, Form, Modal, Select, Skeleton, Steps, Tag} from 'antd';

import YAML from 'yaml';

import {ServiceItem, useGetServices} from '@models/api';

import {useAppDispatch} from '@redux/hooks';
import {closeApiDeployModal} from '@redux/reducers/ui';

import {ErrorLabel} from '@components/AntdCustom';

import * as S from './styled';

const {Option} = Select;

const ApiDeployModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [apiContent, setApiContent] = useState<{[key: string]: any}>();
  const [selectedService, setSelectedService] = useState<ServiceItem>();

  const selectedServicePorts = useMemo(() => {
    if (!selectedService) {
      return [];
    }

    return selectedService.ports.map(port => port.port);
  }, [selectedService]);

  const {data, error, loading} = useGetServices({});

  const [form] = Form.useForm();

  const onCancelHandler = () => {
    dispatch(closeApiDeployModal());
  };

  const onDeployHandler = () => {
    if (!apiContent) {
      return;
    }

    form.validateFields().then(values => {
      const deployedApiContent = {
        ...apiContent,
        'x-kusk': {...apiContent['x-kusk'], upstream: {...values.upstream}},
      };

      console.log(JSON.stringify(YAML.stringify(deployedApiContent)));
    });
  };

  const onNextHandler = () => {
    form.validateFields().then(values => {
      setApiContent(YAML.parse(JSON.parse(JSON.stringify(values.content))));
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
    if (!activeStep || !apiContent) {
      return;
    }

    const upstreamService = apiContent['x-kusk']?.upstream?.service;

    if (upstreamService) {
      form.setFieldsValue({
        upstream: {
          service: {name: upstreamService.name, namespace: upstreamService.namespace, port: upstreamService.port},
        },
      });
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
            <S.Step title="Upstream Service" />
          </Steps>
        </S.StepsContainer>

        <Form form={form} initialValues={{content: ''}} layout="vertical">
          {activeStep === 0 ? (
            <Form.Item
              name="content"
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
              <S.Textarea rows={20} placeholder="Enter API content in YAML/JSON format" />
            </Form.Item>
          ) : (
            <>
              {loading ? (
                <Skeleton.Button />
              ) : error ? (
                <ErrorLabel>{error.message}</ErrorLabel>
              ) : (
                data && (
                  <Form.Item name="service" label="Cluster Services">
                    <S.Select
                      allowClear
                      placeholder="Select service"
                      showSearch
                      onClear={onServiceSelectClearHandler}
                      onSelect={(value: any, option: any) => {
                        onServiceSelectHandler(option.service);
                      }}
                    >
                      {data.map(serviceItem => (
                        <Option key={`${serviceItem.namespace}-${serviceItem.name}`} service={serviceItem}>
                          <Tag>{serviceItem.namespace}</Tag>
                          {serviceItem.name}
                        </Option>
                      ))}
                    </S.Select>
                  </Form.Item>
                )
              )}

              <Form.Item
                label="Name"
                name={['upstream', 'service', 'name']}
                rules={[{required: true, message: 'Please enter a name!'}]}
              >
                <S.Input disabled={Boolean(selectedService)} />
              </Form.Item>

              <Form.Item
                label="Namespace"
                name={['upstream', 'service', 'namespace']}
                rules={[{required: true, message: 'Please enter a namespace!'}]}
              >
                <S.Input disabled={Boolean(selectedService)} />
              </Form.Item>

              <Form.Item
                label="Port"
                name={['upstream', 'service', 'port']}
                rules={[{required: true, message: `Please ${selectedService ? 'choose' : 'enter'} a valid port!`}]}
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
            </>
          )}
        </Form>
      </S.Container>
    </Modal>
  );
};

export default ApiDeployModal;
