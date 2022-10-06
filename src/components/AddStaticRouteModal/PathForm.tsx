import {Form, Input} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';

import * as S from './PathForm.styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1);

const PathForm = () => {
  return (
    <>
      <Form.Item
        name="path"
        label="Path"
        rules={[
          {required: true, message: 'Enter a path'},
          {pattern: /^\/.+$/, message: 'Path must begin with a forward slash “/”'},
          {pattern: /^\/[/.a-zA-Z0-9-]+$/, message: 'Please enter a valid path'},
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Operations"
        name="methods"
        initialValue={['get']}
        rules={[{required: true, message: 'must select one operation at least'}]}
      >
        <S.CheckboxGroup>
          {METHODS.map(method => (
            <S.Checkbox key={method} value={method} disabled={method === 'get'}>
              {method.toUpperCase()}
            </S.Checkbox>
          ))}
        </S.CheckboxGroup>
      </Form.Item>
    </>
  );
};

export default PathForm;
