import {useEffect} from 'react';

import {Form, FormInstance} from 'antd';

import * as S from './styled';

interface IProps {
  form: FormInstance<any>;
  openApiSpec: {[key: string]: any};
}

const QOS: React.FC<IProps> = props => {
  const {form, openApiSpec} = props;

  useEffect(() => {
    const qos = openApiSpec['x-kusk']?.qos;

    if (!qos) {
      return;
    }

    form.setFieldsValue({
      qos: {
        idle_timeout: qos['idle_timeout'],
        retries: qos['retries'],
        request_timeout: qos['request_timeout'],
      },
    });

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
