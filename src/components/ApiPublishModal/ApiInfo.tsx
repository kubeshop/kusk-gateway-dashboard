import {useEffect} from 'react';

import {Form, FormInstance} from 'antd';

import {ApiItem} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import * as S from './ApiInfo.styled';

interface IProps {
  form: FormInstance<any>;
}

const ApiInfo: React.FC<IProps> = props => {
  const {form} = props;

  const apiContent = useAppSelector(state => state.main.newApiContent);
  const apis = useAppSelector(state => state.main.apis);

  useEffect(() => {
    if (!apiContent) {
      return;
    }

    form.setFieldsValue({name: apiContent.name, namespace: apiContent.namespace});

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
    </>
  );
};

const checkDuplicateAPI = (apis: ApiItem[], apiKey: string) =>
  apis.find(api => `${api.namespace}-${api.name}` === apiKey);

export default ApiInfo;