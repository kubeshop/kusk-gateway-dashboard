import {useEffect} from 'react';

import {Checkbox, Form, FormInstance} from 'antd';

import YAML from 'yaml';

import {useAppSelector} from '@redux/hooks';

import * as S from './OpenApiSpec.styled';

interface IProps {
  form: FormInstance<any>;
  setIsApiMocked: (value: boolean) => void;
}

const OpenApiSpec: React.FC<IProps> = props => {
  const {form, setIsApiMocked} = props;

  const apiContent = useAppSelector(state => state.main.newApiContent);

  useEffect(() => {
    if (!apiContent) {
      return;
    }

    const mocking = apiContent.openapi['x-kusk']?.mocking;

    if (mocking) {
      form.setFieldsValue({mocking});
    }

    form.setFieldsValue({openapi: YAML.stringify(apiContent.openapi)});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiContent]);

  return (
    <>
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
        <S.Textarea rows={15} placeholder="Enter OpenAPI Spec in YAML/JSON format" />
      </Form.Item>

      <Form.Item name={['mocking', 'enabled']} valuePropName="checked">
        <Checkbox onChange={e => setIsApiMocked(e.target.checked)}>Enable mocking</Checkbox>
      </Form.Item>
    </>
  );
};

export default OpenApiSpec;
