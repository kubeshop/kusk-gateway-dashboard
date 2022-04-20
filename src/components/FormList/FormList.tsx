import {Button, Form} from 'antd';
import {NamePath} from 'antd/lib/form/interface';

import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

import * as S from './styled';

interface IProps {
  addButtonText: string;
  name: NamePath;
  requiredMessage: string;
  label?: string;
  placeholder?: string;
}

const FormList: React.FC<IProps> = props => {
  const {addButtonText, label = '', name, placeholder = '', requiredMessage} = props;

  return (
    <>
      {label && <S.Label>{label}</S.Label>}

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
              <Button icon={<PlusOutlined />} type="default" onClick={() => add('', 0)}>
                {addButtonText}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default FormList;
