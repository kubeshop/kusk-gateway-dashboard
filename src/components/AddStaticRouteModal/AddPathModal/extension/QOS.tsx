import {Form} from 'antd';

import * as S from './styled';

interface IProps {}

const QOS: React.FC<IProps> = () => {
  return (
    <>
      <Form.Item label="Idle timeout" name={['qos', 'idle_timeout']}>
        <S.Input placeholder="Timeout for idle connections" type="number" />
      </Form.Item>

      <Form.Item label="Retries" name={['qos', 'retries']}>
        <S.Input placeholder="Number of retries" type="number" />
      </Form.Item>

      <Form.Item label="Request timeout" name={['qos', 'request_timeout']}>
        <S.Input placeholder="Total request timeout" type="number" />
      </Form.Item>
    </>
  );
};

export default QOS;
