import {Form, Input} from 'antd';

import {useAppSelector} from '@redux/hooks';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

interface IProps {
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const QOS = ({onFinish, onCancel}: IProps) => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];

  return (
    <FormCard
      enableCancelButton
      heading="QoS"
      subHeading="Configure your quality of service settings"
      helpTopic="QoS"
      helpLink="https://docs.kusk.io/extension/#qos"
      formProps={{layout: 'vertical', onFinish}}
      cancelEditMode={onCancel}
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
