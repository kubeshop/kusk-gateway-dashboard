import {useEffect} from 'react';

import {Button, Form, FormInstance} from 'antd';

import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

import * as S from './styled';

interface IProps {
  form: FormInstance<any>;
  openApiSpec: {[key: string]: any};
}

const Hosts: React.FC<IProps> = props => {
  const {form, openApiSpec} = props;

  useEffect(() => {
    const hosts = openApiSpec['x-kusk']?.hosts;

    if (!hosts) {
      return;
    }

    form.setFieldsValue({hosts});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openApiSpec]);

  return (
    <Form.List name="hosts">
      {(fields, {add, remove}) => (
        <>
          {fields.map(field => (
            <S.Space key={field.key} align="baseline">
              <Form.Item
                {...field}
                rules={[{required: true, whitespace: true, message: 'Enter host or delete this field.'}]}
              >
                <S.Input placeholder="e.g. example.com" />
              </Form.Item>

              <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
            </S.Space>
          ))}

          <Form.Item>
            <Button icon={<PlusOutlined />} type="primary" onClick={() => add('', 0)}>
              Add host
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default Hosts;
