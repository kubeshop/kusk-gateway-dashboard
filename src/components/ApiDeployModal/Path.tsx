import {useEffect} from 'react';

import {Form, FormInstance} from 'antd';

import * as S from './styled';

interface IProps {
  form: FormInstance<any>;
  openApiSpec: {[key: string]: any};
}

const Path: React.FC<IProps> = props => {
  const {form, openApiSpec} = props;

  useEffect(() => {
    const path = openApiSpec['x-kusk']?.path;

    if (!path) {
      return;
    }

    form.setFieldsValue({path});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openApiSpec]);

  return (
    <Form.Item label="Prefix" name={['path', 'prefix']}>
      <S.Input />
    </Form.Item>
  );
};

export default Path;
