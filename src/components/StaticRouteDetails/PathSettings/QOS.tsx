import {Form, Input} from 'antd';

import {Divider} from '@components/AntdCustom';
// import _ from 'lodash';
// import {useAppSelector} from '@redux/hooks';
import {FormCard} from '@components/FormCard';

const QOS = () => {
  // const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);
  // const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);
  // const qos = _.find(selectedRouteSpec?.spec?.paths[selectedRoutePath], 'qos');

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
      >
        <Input placeholder="Timeout for idle connections" type="number" />
      </Form.Item>
      <Divider />
      <Form.Item label="Retries" name={['qos', 'retries']} getValueFromEvent={e => Number(e.target.value)}>
        <Input placeholder="Number of retries" type="number" />
      </Form.Item>
      <Divider />
      <Form.Item
        label="Request timeout (in seconds)"
        name={['qos', 'request_timeout']}
        getValueFromEvent={e => Number(e.target.value)}
      >
        <Input placeholder="Total request timeout" type="number" />
      </Form.Item>
      <Divider />
    </FormCard>
  );
};
export default QOS;
