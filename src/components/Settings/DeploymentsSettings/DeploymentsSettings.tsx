import {useDispatch} from 'react-redux';

import {Button, Form, Input, Tag, Typography} from 'antd';

import {openEnvoyFleetModalModal} from '@redux/reducers/ui';
import {useGetEnvoyFleetsQuery, useGetServicesQuery} from '@redux/services/enhancedApi';

import {SubHeading} from '@components/AntdCustom';

import * as S from './styled';

const DeploymentsSettings = () => {
  const dispatch = useDispatch();
  const {data: fleets} = useGetEnvoyFleetsQuery({});
  const {data: services} = useGetServicesQuery({});
  const fleetsNames = fleets?.map(f => `${f.namespace}-${f.name}`);
  const deployments = services?.filter(service => fleetsNames?.includes(`${service.namespace}-${service.name}`));

  const onAddDeploymentClickHandler = () => {
    dispatch(openEnvoyFleetModalModal());
  };

  return (
    <>
      <S.Header>
        <div>
          <S.Title level={3}>Deployment Fleets</S.Title>
          <SubHeading>
            Add deployment fleets (or envoy fleets) to expose and route your APIs and frontend applications.
          </SubHeading>
        </div>
        <Button type="primary" size="large" onClick={onAddDeploymentClickHandler}>
          Add deployment fleet
        </Button>
      </S.Header>
      <S.Deployments>
        {deployments?.map(deployment => (
          <S.Card
            key={`${deployment.namespace}-${deployment.name}`}
            title={
              <div>
                <Typography.Title level={5}>{deployment.name}</Typography.Title>
                <Tag>{serviceTypeLabel(deployment.serviceType)} </Tag>
              </div>
            }
          >
            <Form disabled layout="vertical">
              <Form.Item name="service" label="Cluster Service" initialValue={deployment.namespace}>
                <Input />
              </Form.Item>
              <Form.Item name="port" label="Port" initialValue={deployment.ports[0].port}>
                <Input />
              </Form.Item>
            </Form>
          </S.Card>
        ))}
      </S.Deployments>
    </>
  );
};

const serviceTypeLabel = (type: 'LoadBalancer' | 'ClusterIP') => {
  return type === 'LoadBalancer' ? `Public - ${type}` : `Private - ${type}`;
};

export default DeploymentsSettings;
