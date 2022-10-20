import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Form, Input, Modal, Radio, Select} from 'antd';
import {RcFile} from 'antd/lib/upload';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {AppRoutes} from '@constants/AppRoutes';

import {AlertEnum} from '@models/alert';
import {ApiContent} from '@models/main';

import {setAlert} from '@redux/reducers/alert';
import {selectApi} from '@redux/reducers/main';
import {closeApiPublishModal, closeFileApiModal} from '@redux/reducers/ui';
import {useDeployApiMutation, useGetApisQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';
import {ApiItem} from '@redux/services/kuskApi';

import {FilePicker, FleetDropdown} from '@components/FormComponents';

import {checkDuplicateAPI, formatApiName} from '@utils/api';

import * as S from './styled';

const FileApiModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const type = Form.useWatch('type', form);
  const {data: apis} = useGetApisQuery({});
  const {data: namespaces} = useGetNamespacesQuery();
  const [deployAPI, {isError, error, isUninitialized}] = useDeployApiMutation();

  useEffect(() => {
    if (!isUninitialized && isError && error?.message) {
      Modal.error({
        type: 'error',
        title: 'Something wrong happened!',
        content: error?.message,
        okText: 'Got it!',
        cancelText: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isUninitialized]);

  const onBackHandler = () => {
    dispatch(closeFileApiModal());
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
    const openapiObj = openapi;
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
        dispatch(closeFileApiModal());
        dispatch(
          setAlert({
            title: 'API deployed successfully',
            description: `${apiData.name} was deployed successfully in ${apiData.namespace} namespace`,
            type: AlertEnum.Success,
          })
        );
        dispatch(selectApi(apiData));
        navigate(`${AppRoutes.API}/${apiData.namespace}/${apiData.name}`);
      });
  };

  return (
    <Modal visible title="Create an API from file" onCancel={onBackHandler} onOk={onSubmitHandler} okText="Create API">
      <Form form={form} layout="vertical">
        <Form.Item required name="type" label="Import API via" initialValue="file">
          <Radio.Group>
            <Radio value="file">File</Radio>
            <Radio value="url">URL</Radio>
          </Radio.Group>
        </Form.Item>

        {type === 'file' ? (
          <Form.Item
            name="file"
            getValueFromEvent={event => event}
            getValueProps={e => e}
            rules={[
              {
                validator: async (_, value) => {
                  try {
                    const openapi = await readFile((value as any).file);
                    if (openapi) {
                      let parsedOpenApi = YAML.parse(JSON.parse(JSON.stringify(openapi)));
                      let apiName = form.getFieldValue('name') || formatApiName(parsedOpenApi?.info?.title);
                      form.setFieldsValue({name: apiName, openapi: parsedOpenApi});

                      return Promise.resolve();
                    }
                  } catch (e) {
                    throw new Error('Cannot read the file');
                  }
                },
              },
            ]}
            valuePropName="fileList"
          >
            <FilePicker />
          </Form.Item>
        ) : (
          <Form.Item
            required
            name="url"
            label="URL"
            rules={[
              {
                validator: async (_, value) => {
                  try {
                    const openapi = await fetchOpenapiURL(value);
                    if (openapi) {
                      let parsedOpenApi = YAML.parse(JSON.parse(JSON.stringify(openapi)));
                      let apiName = form.getFieldValue('name') || formatApiName(parsedOpenApi?.info?.title);
                      form.setFieldsValue({name: apiName, openapi: parsedOpenApi});
                      return Promise.resolve();
                    }
                  } catch (e) {
                    throw new Error('Cannot fetch url');
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

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
        <Form.Item hidden name="openapi" />
      </Form>
    </Modal>
  );
};

const readFile = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(e?.target?.result as string);
    };
    reader.onerror = e => reject(e);
    reader.readAsText(file);
  });
};

const fetchOpenapiURL = async (url: string) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.text();
  }
};

export default FileApiModal;
