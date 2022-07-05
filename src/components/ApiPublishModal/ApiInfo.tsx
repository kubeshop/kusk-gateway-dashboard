import {useEffect} from 'react';

import {Form, Select} from 'antd';

import YAML from 'yaml';

import {useGetApisQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';
import {ApiItem} from '@redux/services/kuskApi';

import * as S from './ApiInfo.styled';

const ApiInfo = (): JSX.Element => {
  const form = Form.useFormInstance();

  const {data: apis} = useGetApisQuery({});
  const {data: namespaces} = useGetNamespacesQuery();

  useEffect(() => {
    const values = form.getFieldsValue(true);
    const {openapi, mocking, name} = values;

    let parsedOpenApi = YAML.parse(JSON.parse(JSON.stringify(openapi)));
    let apiName = name || formatApiName(parsedOpenApi?.info?.title);
    if (mocking?.enabled) {
      if (!apiName.startsWith('mock-')) {
        apiName = `mock-${apiName}`;
      }
    } else if (!mocking?.enabled && apiName.startsWith('mock-')) {
      apiName = apiName.replace('mock-', '');
    }

    form.setFieldsValue({name: apiName});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

const formatApiName = (name: string) =>
  name
    ? name
        .trim()
        .replace(/[\W_]+/g, '-')
        .toLowerCase()
    : '';

const checkDuplicateAPI = (apis: ApiItem[], apiKey: string) =>
  apis.find(api => `${api.namespace}-${api.name}` === apiKey);

export default ApiInfo;
