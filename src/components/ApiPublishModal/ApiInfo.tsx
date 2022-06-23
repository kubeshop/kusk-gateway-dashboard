import {useEffect} from 'react';

import {Form, Select} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {useGetApisQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';
import {ApiItem} from '@redux/services/kuskApi';

import * as S from './ApiInfo.styled';

const ApiInfo = (): JSX.Element => {
  const form = Form.useFormInstance();

  const apiContent = useAppSelector(state => state.main.newApiContent);
  const {data: apis} = useGetApisQuery({});
  const {data: namespaces} = useGetNamespacesQuery();

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

                if (checkDuplicateAPI(apis || [], `${namespace}-${value}`)) {
                  return Promise.reject(new Error(`API name is already used in ${namespace} namespace!`));
                }

                return Promise.resolve();
              },
            };
          },
        ]}
      >
        <S.Input placeholder="API name" type="text" />
      </Form.Item>

      <Form.Item
        label="Namespace"
        name="namespace"
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
    </>
  );
};

const checkDuplicateAPI = (apis: ApiItem[], apiKey: string) =>
  apis.find(api => `${api.namespace}-${api.name}` === apiKey);

export default ApiInfo;
