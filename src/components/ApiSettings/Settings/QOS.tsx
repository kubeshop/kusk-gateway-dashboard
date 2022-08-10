import {useDispatch} from 'react-redux';

import {Form, Input} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {updateApiSettings} from '@redux/reducers/main';

import {FormCard} from '@components/FormCard';

import * as S from './styled';

const QOS = () => {
  const dispatch = useDispatch();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec['x-kusk'];

  const onSubmitHandler = (values: any) => {
    dispatch(updateApiSettings({editedOpenapi: values}));
  };
  return (
    <FormCard
      heading="QoS"
      subHeading="Configure your quality of service settings"
      helpTopic="QoS"
      helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#qos"
      formProps={{layout: 'vertical', onFinish: onSubmitHandler}}
    >
      <Form.Item
        label="Idle timeout (in seconds)"
        name={['x-kusk', 'qos', 'idle_timeout']}
        getValueFromEvent={e => Number(e.target.value)}
        initialValue={xKusk?.qos && xKusk.qos['idle_timeout']}
      >
        <Input placeholder="Timeout for idle connections" type="number" />
      </Form.Item>

      <Form.Item
        label="Retries"
        name={['x-kusk', 'qos', 'retries']}
        getValueFromEvent={e => Number(e.target.value)}
        initialValue={xKusk?.qos?.retries}
      >
        <Input placeholder="Number of retries" type="number" />
      </Form.Item>

      <Form.Item
        label="Request timeout (in seconds)"
        name={['x-kusk', 'qos', 'request_timeout']}
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
