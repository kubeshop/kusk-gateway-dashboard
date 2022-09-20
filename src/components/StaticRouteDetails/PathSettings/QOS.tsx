import {useDispatch} from 'react-redux';

import {Form, Input} from 'antd';

import _ from 'lodash';

import {useAppSelector} from '@redux/hooks';
import {updateStaticRouteSettings} from '@redux/reducers/main';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormComponents';

const QOS = () => {
  const dispatch = useDispatch();
  const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);
  const qos = _.pick<any>(Object.values(selectedRouteSpec?.spec?.paths[selectedRoutePath])[0], 'route.qos')?.route?.qos;

  const onSubmitClickHandler = (values: any) => {
    const {
      qos: {idle_timeout: idleTimeout, retries, request_timeout: requestTimeout},
    } = values;
    const updatedPath = Object.keys(selectedRouteSpec?.spec?.paths[selectedRoutePath]).reduce((acc: any, key: any) => {
      let method = JSON.parse(JSON.stringify(selectedRouteSpec?.spec?.paths[selectedRoutePath][key]));
      method = _.merge(method, {
        route: {
          qos: {
            idle_timeout: idleTimeout,
            retries,
            request_timeout: requestTimeout,
          },
        },
      });
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
      heading="QoS"
      subHeading="Configure your quality of service settings"
      helpTopic="QoS"
      helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#qos"
      formProps={{layout: 'vertical', onFinish: onSubmitClickHandler}}
    >
      <Form.Item
        label="Idle timeout (in seconds)"
        name={['qos', 'idle_timeout']}
        initialValue={qos?.idle_timeout}
        getValueFromEvent={e => Number(e.target.value)}
      >
        <Input placeholder="Timeout for idle connections" type="number" />
      </Form.Item>
      <Divider />
      <Form.Item
        label="Retries"
        name={['qos', 'retries']}
        initialValue={qos?.retries}
        getValueFromEvent={e => Number(e.target.value)}
      >
        <Input placeholder="Number of retries" type="number" />
      </Form.Item>
      <Divider />
      <Form.Item
        label="Request timeout (in seconds)"
        name={['qos', 'request_timeout']}
        initialValue={qos?.request_timeout}
        getValueFromEvent={e => Number(e.target.value)}
      >
        <Input placeholder="Total request timeout" type="number" />
      </Form.Item>
      <Divider />
    </FormCard>
  );
};
export default QOS;
