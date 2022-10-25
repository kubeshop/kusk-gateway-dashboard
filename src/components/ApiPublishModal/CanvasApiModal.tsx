import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Button, Form, Input, Select} from 'antd';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {AppRoutes} from '@constants/AppRoutes';
import ToDoTemplate from '@constants/rawOpenApiSpec.json';

import {AlertEnum} from '@models/alert';
import {ApiContent} from '@models/main';

import {useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {selectApi} from '@redux/reducers/main';
import {closeApiPublishModal, closeCanvasApiModal} from '@redux/reducers/ui';
import {useDeployApiMutation, useGetApisQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';
import {ApiItem} from '@redux/services/kuskApi';

import {FleetDropdown} from '@components/FormComponents';

import {checkDuplicateAPI, formatApiName} from '@utils/api';

import * as S from './styled';

const CanvasApiModal = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const apiCanvasType = useAppSelector(state => state.ui.apiPublishModal.apiCanvasType);
  const openapiField = Form.useWatch('openapi', form);
  const {data: apis} = useGetApisQuery({});
  const {data: namespaces} = useGetNamespacesQuery();
  const [deployAPI] = useDeployApiMutation();

  useEffect(() => {
    if (apiCanvasType === 'template') {
      form.setFieldsValue({openapi: YAML.stringify(ToDoTemplate), name: formatApiName(ToDoTemplate?.info?.title)});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openapiField) {
      let parsedOpenApi = YAML.parse(JSON.parse(JSON.stringify(openapiField)));
      let apiName = form.getFieldValue('name') || formatApiName(parsedOpenApi?.info?.title);
      form.setFieldsValue({name: apiName});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openapiField]);

  const onBackHandler = () => {
    dispatch(closeCanvasApiModal());
  };

  const onSubmitHandler = async () => {
    const {name, namespace, envoyFleet, openapi} = await form.validateFields();
    let newApiContent: ApiContent = {
      name,
      namespace: namespace || 'default',
      envoyFleetNamespace: envoyFleet.split(',')[0],
      envoyFleetName: envoyFleet.split(',')[1],
      openapi,
    };
    const openapiObj = YAML.parse(openapi);
    openapiObj['x-kusk'] = {
      mocking: {
        enabled: true,
      },
    };
    const body = {
      name: newApiContent.name,
      namespace: newApiContent.namespace,
      envoyFleetName: newApiContent.envoyFleetName,
      envoyFleetNamespace: newApiContent.envoyFleetNamespace,
      openapi: YAML.stringify(cleanDeep(openapiObj)),
    };
    deployAPI({body})
      .unwrap()
      .then((response: any) => {
        const apiData: ApiItem = response;

        dispatch(closeApiPublishModal());
        dispatch(closeCanvasApiModal());
        dispatch(
          setAlert({
            title: 'API deployed successfully',
            description: `${apiData.name} was deployed successfully in ${apiData.namespace} namespace`,
            type: AlertEnum.Success,
          })
        );
        dispatch(selectApi(apiData));
        navigate(`${AppRoutes.API}/${apiData.namespace}/${apiData.name}`);
      })
      .catch(error => {
        dispatch(
          setAlert({
            title: 'Unable to deploy API',
            description: error?.message,
            type: AlertEnum.Error,
          })
        );
      });
  };

  return (
    <S.Modal
      open
      closable
      title={`Create an API from ${apiCanvasType === 'template' ? 'template' : 'scratch'}`}
      footer={
        <>
          <Button onClick={onBackHandler}>Back</Button>

          <Button type="primary" onClick={onSubmitHandler}>
            Create API
          </Button>
        </>
      }
      onCancel={onBackHandler}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          hasFeedback
          name="name"
          label="Name"
          required
          dependencies={['namespace']}
          rules={[
            {required: true, message: 'Enter API name'},
            {
              pattern: /^[a-z0-9].*[a-z0-9]$/gi,
              message: 'Name must start and end with an alphanumerical character',
            },
            {
              pattern: /^[a-z0-9]$|^([a-z0-9\-])*[a-z0-9]$/,
              message: 'Name must contain only lowercase alphanumerical characters or "-"',
            },
            {max: 63, type: 'string', message: 'Name is too long'},
            () => {
              return {
                validator(_, value) {
                  const namespace = form.getFieldValue('namespace');

                  if (namespace && checkDuplicateAPI(apis || [], `${namespace}-${value}`)) {
                    return Promise.reject(new Error(`API name is already used in ${namespace} namespace`));
                  }

                  return Promise.resolve();
                },
              };
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="namespace"
          label="Namespace"
          rules={[
            {
              required: true,
              message: 'Please select namespace',
            },
          ]}
        >
          <Select>
            {namespaces?.map(el => (
              <Select.Option key={el.name} value={el.name}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          required
          name="envoyFleet"
          label="Deployment"
          rules={[
            {
              required: true,
              message: 'Please select deployment',
            },
          ]}
        >
          <FleetDropdown />
        </Form.Item>

        <Form.Item
          required
          name="openapi"
          label="Open API Spec"
          rules={[
            {
              required: true,
              message: 'Please enter your API content',
            },
            () => {
              return {
                validator(_, value) {
                  if (typeof YAML.parse(JSON.parse(JSON.stringify(value))) === 'object') {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Please enter correctly formatted JSON or YAML'));
                },
              };
            },
          ]}
        >
          <S.Textarea rows={10} placeholder="Enter the OpenAPI Spec in YAML/JSON format" />
        </Form.Item>
      </Form>
    </S.Modal>
  );
};

export default CanvasApiModal;
