import {Button, Form} from 'antd';
import {NamePath} from 'antd/lib/form/interface';

import {DeleteOutlined} from '@ant-design/icons';

import _ from 'lodash';

import * as S from './styled';

interface IProps {
  addButtonText: string;
  name: NamePath;
  required?: boolean;
  requiredMessage?: string;
  label?: string;
  placeholder?: string;
  initialValue?: any;
}

const FormList: React.FC<IProps> = props => {
  const {addButtonText, label = '', name, placeholder = '', required, requiredMessage, initialValue} = props;

  return (
    <Form.Item label={label} required={required} rules={[{required}]}>
      <Form.List
        name={name}
        initialValue={initialValue}
        rules={[
          {
            validator(arg, value: string[]) {
              if (required && (!value || value?.length === 0)) {
                return Promise.reject(Error('Required field.'));
              }
              if (value?.length > 0 && _.uniq(value || []).length !== value?.length) {
                return Promise.reject(Error('Duplicated items.'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        {(fields, {add, remove}, {errors}) => (
          <>
            {fields.map((field, index) => {
              return (
                <S.Space key={field.key} align="baseline">
                  <Form.Item
                    {...field}
                    rules={[{required: Boolean(requiredMessage?.length), message: requiredMessage}]}
                  >
                    <S.Input placeholder={placeholder} />
                  </Form.Item>

                  <DeleteOutlined onClick={() => remove(field.name)} />
                </S.Space>
              );
            })}
            <Form.ErrorList errors={errors} />
            <S.ButtonContainer>
              <Form.Item>
                <Button type="default" onClick={() => add('', 0)}>
                  {addButtonText}
                </Button>
              </Form.Item>
            </S.ButtonContainer>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default FormList;
