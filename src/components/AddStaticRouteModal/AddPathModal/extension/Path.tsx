import {useState} from 'react';

import {Checkbox, Form} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';

import * as S from './styled';

interface IProps {}

const METHODS = SUPPORTED_METHODS.slice(0, -1);

const Path: React.FC<IProps> = () => {
  const form = Form.useFormInstance();
  const [areCheckedAll, setAreCheckedAll] = useState(false);

  const onCheckHandler = () => {
    if (areCheckedAll) {
      form.setFieldsValue({path: {methods: []}});
      setAreCheckedAll(false);
    } else {
      form.setFieldsValue({path: {methods: METHODS}});
      setAreCheckedAll(true);
    }
  };

  return (
    <>
      <Form.Item label="Path" name={['path', 'name']} rules={[{required: true, message: 'type the path prefix'}]}>
        <S.Input placeholder="Path for the route" />
      </Form.Item>
      <Form.Item
        label={
          <div>
            Methods
            <S.StyledButton type="ghost" onClick={onCheckHandler}>
              {areCheckedAll ? 'Uncheck all' : 'Check all'}
            </S.StyledButton>
          </div>
        }
        name={['path', 'methods']}
        rules={[{required: true}]}
      >
        <Checkbox.Group>
          {METHODS.map(method => (
            <Checkbox key={method} value={method}>
              {method.toUpperCase()}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </>
  );
};

export default Path;
