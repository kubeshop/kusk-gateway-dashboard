import {useDispatch} from 'react-redux';

import {Checkbox, Form} from 'antd';

import _ from 'lodash';

import {useAppSelector} from '@redux/hooks';
import {updateStaticRouteSettings} from '@redux/reducers/main';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormComponents';

const Websocket = () => {
  const dispatch = useDispatch();
  const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);
  const upstream = _.pick<any>(Object.values(selectedRouteSpec?.spec?.paths[selectedRoutePath])[0], 'route.upstream')
    ?.route?.upstream;
  const websocket = _.pick<any>(Object.values(selectedRouteSpec?.spec?.paths[selectedRoutePath])[0], 'route.websocket')
    ?.route?.websocket;

  const onSubmitClickHandler = (values: any) => {
    const {websocket: websocketValue} = values;
    const updatedPath = Object.keys(selectedRouteSpec?.spec?.paths[selectedRoutePath]).reduce((acc: any, key: any) => {
      let method = JSON.parse(JSON.stringify(selectedRouteSpec?.spec?.paths[selectedRoutePath][key]));
      method = _.merge(method, {route: {websocket: websocketValue}});
      acc[key] = method;
      return acc;
    }, {});

    dispatch(
      updateStaticRouteSettings({
        editedOpenapi: {
          paths: {
            [selectedRoutePath]: updatedPath,
          },
        },
      })
    );
  };

  return (
    <FormCard
      heading="Websocket"
      subHeading='Handle "Upgrade: websocket" and other actions related to Websocket HTTP headers.'
      helpLink="https://docs.kusk.io/extension#websocket"
      helpTopic="Websockets"
      formProps={{name: 'websockets', onFinish: onSubmitClickHandler, disabled: Boolean(!upstream)}}
    >
      <Form.Item name="websocket" valuePropName="checked" initialValue={websocket}>
        <Checkbox>Enable WebSocket</Checkbox>
      </Form.Item>
      <Divider />
    </FormCard>
  );
};
export default Websocket;
