import {useEffect} from 'react';

import {Form, FormInstance} from 'antd';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

interface IProps {
  form: FormInstance<any>;
}

const Path: React.FC<IProps> = props => {
  const {form} = props;

  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi || {});

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
      <S.Input placeholder="Prefix for the route" />
    </Form.Item>
  );
};

export default Path;
