import {Button, Form} from 'antd';

import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

import * as S from './styled';

interface IProps {
  addButtonText: string;
  name: string;
  requiredMessage: string;
  placeholder?: string;
}

const FormList: React.FC<IProps> = props => {
  const {addButtonText, name, placeholder = '', requiredMessage} = props;

  return (
    <Form.List name={name}>
      {(fields, {add, remove}) => (
        <>
          {fields.map(field => (
            <S.Space key={field.key} align="baseline">
              <Form.Item {...field} rules={[{required: true, whitespace: true, message: requiredMessage}]}>
                <S.Input placeholder={placeholder} />
              </Form.Item>

              <MinusCircleOutlined onClick={() => remove(field.name)} />
            </S.Space>
          ))}

          <Form.Item>
            <Button icon={<PlusOutlined />} type="primary" onClick={() => add('', 0)}>
              {addButtonText}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default FormList;
