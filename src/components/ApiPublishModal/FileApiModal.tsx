import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Form, Input, Modal, Radio, Select} from 'antd';
import {RcFile} from 'antd/lib/upload';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {AlertEnum} from '@models/alert';
import {ApiContent} from '@models/main';

import {setAlert} from '@redux/reducers/alert';
import {selectApi} from '@redux/reducers/main';
import {closeApiPublishModal, closeFileApiModal} from '@redux/reducers/ui';
import {useDeployApiMutation, useGetApisQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';
import {ApiItem} from '@redux/services/kuskApi';

import {checkDuplicateAPI, formatApiName} from '@utils/api';

import {FilePicker, FleetDropdown} from './FormComponents';

const FileApiModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const type = Form.useWatch('type', form);
  const {data: apis} = useGetApisQuery({});
  const {data: namespaces} = useGetNamespacesQuery();
  const [deployAPI] = useDeployApiMutation();

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
        dispatch(closeFileApiModal());
        dispatch(
          setAlert({
            title: 'API deployed successfully',
            description: `${apiData.name} was deployed successfully in ${apiData.namespace} namespace!`,
            type: AlertEnum.Success,
          })
        );
        dispatch(selectApi(apiData));
        navigate(`/${apiData.namespace}/${apiData.name}`);
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
                      let parsedOpenApi = YAML.parse(YAML.parse(JSON.parse(JSON.stringify(openapi))));
                      let apiName = form.getFieldValue('name') || formatApiName(parsedOpenApi?.info?.title);
                      form.setFieldsValue({name: apiName, openapi: parsedOpenApi});

                      return Promise.resolve();
                    }
                  } catch (e) {
                    throw new Error('Cannot read the file!');
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
                      let parsedOpenApi = YAML.parse(YAML.parse(JSON.parse(JSON.stringify(openapi))));
                      let apiName = form.getFieldValue('name') || formatApiName(parsedOpenApi?.info?.title);
                      form.setFieldsValue({name: apiName, openapi: parsedOpenApi});
                      return Promise.resolve();
                    }
                  } catch (e) {
                    throw new Error('Cannot fetch url!');
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
            {required: true, message: 'Enter API name!'},
            {pattern: /^[a-z0-9]$|^([a-z0-9\-])*[a-z0-9]$/, message: 'Wrong pattern!'},
            {max: 63, type: 'string', message: 'Name is too long!'},
            () => {
              return {
                validator(_, value) {
                  const namespace = form.getFieldValue('namespace');

                  if (namespace && checkDuplicateAPI(apis || [], `${namespace}-${value}`)) {
                    return Promise.reject(new Error(`API name is already used in ${namespace} namespace!`));
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
              message: 'Please select namespace!',
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
              message: 'Please select deployment!',
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
