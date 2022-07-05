import {Form} from 'antd';

import * as S from './styled';

const QOS: React.FC = () => {
  return (
    <>
      <Form.Item
        label="Idle timeout (in seconds)"
        name={['qos', 'idle_timeout']}
        getValueFromEvent={e => Number(e.target.value)}
      >
        <S.Input placeholder="Timeout for idle connections" type="number" />
      </Form.Item>

      <Form.Item label="Retries" name={['qos', 'retries']} getValueFromEvent={e => Number(e.target.value)}>
        <S.Input placeholder="Number of retries" type="number" />
      </Form.Item>

      <Form.Item
        label="Request timeout (in seconds)"
        name={['qos', 'request_timeout']}
        getValueFromEvent={e => Number(e.target.value)}
      >
        <S.Input placeholder="Total request timeout" type="number" />
      </Form.Item>
    </>
  );
};

export default QOS;
