import {Checkbox, Form} from 'antd';

import _ from 'lodash';

import {useAppSelector} from '@redux/hooks';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormCard';

const Websocket = () => {
  const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);
  const websocket = _.find(selectedRouteSpec?.spec?.paths[selectedRoutePath], 'websocket');
  return (
    <FormCard
      heading="Websocket"
      subHeading='Handle "Upgrade: websocket" and other actions related to Websocket HTTP headers.'
      helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#websocket"
      helpTopic="Websockets"
      formProps={{name: 'websockets'}}
    >
      <Form.Item name="websocket" valuePropName="checked" initialValue={websocket?.enabled}>
        <Checkbox>Enable WebSocket</Checkbox>
      </Form.Item>
      <Divider />
    </FormCard>
  );
};
export default Websocket;
