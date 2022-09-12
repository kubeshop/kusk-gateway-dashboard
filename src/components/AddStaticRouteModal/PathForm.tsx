import {Form, Input} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';

import * as S from './PathForm.styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1);

const PathForm = () => {
  return (
    <>
      <Form.Item name="path" label="Path" rules={[{required: true, message: 'Enter a path!'}]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Operations"
        name="methods"
        rules={[{required: true, message: 'must select one operation at least!'}]}
      >
        <S.CheckboxGroup>
          {METHODS.map(method => (
            <S.Checkbox key={method} value={method}>
              {method.toUpperCase()}
            </S.Checkbox>
          ))}
        </S.CheckboxGroup>
      </Form.Item>
    </>
  );
};

export default PathForm;
