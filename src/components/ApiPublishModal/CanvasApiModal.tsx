import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Button, Form, Input, Select, Tag, Typography} from 'antd';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {SUPPORTED_METHODS} from '@constants/constants';

import {AlertEnum} from '@models/alert';
import {ApiContent} from '@models/main';

import {useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {closeApiPublishModal, closeCanvasApiModal} from '@redux/reducers/ui';
import {
  useDeployApiMutation,
  useGetApisQuery,
  useGetEnvoyFleetsQuery,
  useGetNamespacesQuery,
} from '@redux/services/enhancedApi';
import {ApiItem} from '@redux/services/kuskApi';

import ToDoTemplate from '../../constants/rawOpenApiSpec.json';

import * as S from './styled';

const CanvasApiModal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const apiCanvasType = useAppSelector(state => state.ui.apiPublishModal.apiCanvasType);
  const openapiField = Form.useWatch('openapi', form);
  const [warnings, setWarnings] = useState<string[]>([]);
  const {data: apis} = useGetApisQuery({});
  const {data: envoyFleets} = useGetEnvoyFleetsQuery({});
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
            description: `${apiData.name} was deployed successfully in ${apiData.namespace} namespace!`,
            type: AlertEnum.Success,
          })
        );
      })
      .catch(() => {});
  };

  return (
    <S.Modal
      visible
      closable
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
      <Typography.Title level={2}>Create an API from scratch</Typography.Title>
      <Form layout="vertical" form={form}>
        <Form.Item
          name="name"
          rules={[
            {required: true, message: 'Enter API name!'},
            {pattern: /^[a-z0-9]$|^([a-z0-9\-])*[a-z0-9]$/, message: 'Wrong pattern!'},
            {max: 63, type: 'string', message: 'Name is too long!'},
            () => {
              return {
                validator(_, value) {
                  const namespace = form.getFieldValue('namespace') || 'default';

                  if (checkDuplicateAPI(apis || [], `${namespace}-${value}`)) {
                    return Promise.reject(new Error(`API name is already used in ${namespace} namespace!`));
                  }

                  return Promise.resolve();
                },
              };
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="namespace"
          rules={[
            {
              required: true,
              message: 'Please select namespace!',
            },
          ]}
        >
          <Select placeholder="Namespace">
            {namespaces?.map(el => (
              <Select.Option key={el.name} value={el.name}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="envoyFleet"
          rules={[
            {
              required: true,
              message: 'Please select envoy fleet!',
            },
          ]}
        >
          <Select placeholder="Deployment">
            {envoyFleets?.map(fleet => (
              <Select.Option key={fleet.name} value={`${fleet.namespace},${fleet.name}`}>
                <Tag>{fleet.namespace}</Tag>
                {fleet.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
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
          <S.Textarea
            rows={10}
            placeholder="OpenAPI Spec in YAML/JSON format"
            onChange={e => {
              const spec = e.target.value;

              if (!spec) {
                setWarnings([]);
              } else {
                setWarnings(checkMockingExamples(YAML.parse(JSON.parse(JSON.stringify(spec)))));
              }
            }}
          />
        </Form.Item>
      </Form>
      <S.WarningsContainer>
        {warnings.map(warning => (
          <div key={warning}>
            <S.ExclamationCircleOutlined />
            {warning}
            <a
              href="https://kubeshop.github.io/kusk-gateway/reference/extension/#mocking"
              target="_blank"
              rel="noopener noreferrer"
            >
              mocking examples!
            </a>
          </div>
        ))}
      </S.WarningsContainer>
    </S.Modal>
  );
};

const findResponseExample = (key: string, children: any, check: {hasExample: boolean}) => {
  if ((key === 'example' && children) || (key === 'examples' && children && Object.entries(children).length)) {
    check.hasExample = true;
    return;
  }

  if (children && typeof children === 'object') {
    Object.entries(children).forEach(([k, c]) => findResponseExample(k, c, check));
  }
};

const checkMockingExamples = (spec: {[key: string]: any}) => {
  const paths = spec.paths;

  if (!paths) {
    return [];
  }

  let warnings: string[] = [];

  Object.entries(paths).forEach((pathEntry: [string, any]) => {
    const [path, pathValue] = pathEntry;

    // mocking kusk extension from path level
    const pathMocking = pathValue['x-kusk']?.mocking?.enabled;

    if (pathMocking !== false) {
      Object.entries(pathValue)
        .filter(entry => SUPPORTED_METHODS.includes(entry[0]))
        .forEach((operationEntry: [string, any]) => {
          const [operation, operationValue] = operationEntry;

          // mocking kusk extension from operation level
          const operationMocking = operationValue['x-kusk']?.mocking?.enabled;
          let missingExamplesCount = 0;

          if (operationMocking !== false) {
            Object.entries(operationValue.responses).forEach((responseEntry: [string, any]) => {
              const [responseCode, responseValue] = responseEntry;

              if (parseInt(responseCode, 10) < 300) {
                let check = {hasExample: false};

                findResponseExample(responseCode, responseValue, check);

                if (!check.hasExample) {
                  missingExamplesCount += 1;
                }
              }
            });
          }

          if (missingExamplesCount) {
            warnings.push(`${path} -> ${operation} is missing `);
          }
        });
    }
  });

  return warnings;
};

const checkDuplicateAPI = (apis: ApiItem[], apiKey: string) =>
  apis.find(api => `${api.namespace}-${api.name}` === apiKey);

const formatApiName = (name: string) =>
  name
    ? name
        .trim()
        .replace(/[\W_]+/g, '-')
        .toLowerCase()
    : '';

export default CanvasApiModal;
