import {useEffect} from 'react';

import {Form, FormInstance} from 'antd';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

interface IProps {
  form: FormInstance<any>;
}

const QOS: React.FC<IProps> = props => {
  const {form} = props;

  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi || {});

  useEffect(() => {
    const qos = openApiSpec['x-kusk']?.qos;

    if (!qos) {
      return;
    }

    form.setFieldsValue({qos});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openApiSpec]);

  return (
    <>
      <Form.Item label="Idle timeout" name={['qos', 'idle_timeout']}>
        <S.Input type="number" />
      </Form.Item>

      <Form.Item label="Retries" name={['qos', 'retries']}>
        <S.Input type="number" />
      </Form.Item>

      <Form.Item label="Request timeout" name={['qos', 'request_timeout']}>
        <S.Input type="number" />
      </Form.Item>
    </>
  );
};

export default QOS;
