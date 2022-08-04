import {Form, Input} from 'antd';

import {useAppSelector} from '@redux/hooks';

import {FormCard} from '@components/FormCard';

import * as S from './styled';

const QOS = () => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec['x-kusk'];

  return (
    <FormCard
      heading="QoS"
      subHeading="Configure your quality of service settings"
      helpTopic="QoS"
      helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#qos"
      formProps={{layout: 'vertical'}}
    >
      <Form.Item
        label="Idle timeout (in seconds)"
        name={['qos', 'idle_timeout']}
        getValueFromEvent={e => Number(e.target.value)}
        initialValue={xKusk?.qos && xKusk.qos['idle_timeout']}
      >
        <Input placeholder="Timeout for idle connections" type="number" />
      </Form.Item>

      <Form.Item
        label="Retries"
        name={['qos', 'retries']}
        getValueFromEvent={e => Number(e.target.value)}
        initialValue={xKusk?.qos?.retries}
      >
        <Input placeholder="Number of retries" type="number" />
      </Form.Item>

      <Form.Item
        label="Request timeout (in seconds)"
        name={['qos', 'request_timeout']}
        getValueFromEvent={e => Number(e.target.value)}
        initialValue={xKusk?.qos && xKusk.qos['request_timeout']}
      >
        <Input placeholder="Total request timeout" type="number" />
      </Form.Item>
      <S.Divider />
    </FormCard>
  );
};

export default QOS;
