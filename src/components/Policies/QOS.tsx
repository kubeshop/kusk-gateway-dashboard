import {Form, Input} from 'antd';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const QOS = ({xKusk, onFinish, onCancel}: IProps) => {
  return (
    <FormCard
      enableCancelButton
      heading="QoS"
      subHeading="Configure your quality of service settings"
      helpTopic="Quality of Service"
      helpLink="https://docs.kusk.io/extension/#qos"
      formProps={{layout: 'vertical', onFinish}}
      cancelEditMode={onCancel}
    >
      <Form.Item
        label="Maximum number of retries"
        name={['x-kusk', 'qos', 'retries']}
        getValueFromEvent={e => Number(e.target.value)}
        initialValue={xKusk?.qos?.retries}
      >
        <Input placeholder="Number of retries" type="number" />
      </Form.Item>

      <Form.Item
        label="Total request timeout (in seconds)"
        name={['x-kusk', 'qos', 'request_timeout']}
        getValueFromEvent={e => Number(e.target.value)}
        initialValue={xKusk?.qos && xKusk.qos['request_timeout']}
      >
        <Input placeholder="Total request timeout" type="number" />
      </Form.Item>

      <Form.Item
        label="Timeout for idle connections (in seconds)"
        name={['x-kusk', 'qos', 'idle_timeout']}
        getValueFromEvent={e => Number(e.target.value)}
        initialValue={xKusk?.qos && xKusk.qos['idle_timeout']}
      >
        <Input placeholder="Timeout for idle connections" type="number" />
      </Form.Item>
      <S.Divider />
    </FormCard>
  );
};

export default QOS;
