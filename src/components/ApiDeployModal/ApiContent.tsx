import {useEffect} from 'react';

import {Form, FormInstance} from 'antd';

import YAML from 'yaml';

import {ApiItem} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

interface IProps {
  apiContent: {name: string; namespace: string; openapi: {[key: string]: any}} | undefined;
  form: FormInstance<any>;
}

const ApiContent: React.FC<IProps> = props => {
  const {apiContent, form} = props;

  const apis = useAppSelector(state => state.main.apis);

  useEffect(() => {
    if (!apiContent) {
      return;
    }

    form.setFieldsValue({
      name: apiContent.name,
      namespace: apiContent.namespace,
      openapi: YAML.stringify(apiContent.openapi),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiContent]);

  return (
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
  );
};

const checkDuplicateAPI = (apis: ApiItem[], apiKey: string) =>
  apis.find(api => `${api.namespace}-${api.name}` === apiKey);

export default ApiContent;
