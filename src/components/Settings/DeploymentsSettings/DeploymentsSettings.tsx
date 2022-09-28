import {useDispatch} from 'react-redux';

import {Button, Form, Input, Tag, Typography} from 'antd';

import {openEnvoyFleetModalModal} from '@redux/reducers/ui';
import {useGetEnvoyFleetsQuery, useGetServicesQuery} from '@redux/services/enhancedApi';

import {SubHeading} from '@components/AntdCustom';
import {CardSkeleton} from '@components/Skeletons';

import * as S from './styled';

const FleetsSkelton = () => (
  <>
    {new Array(3).fill(0).map((_, index) => {
      const key = `skeleton-item-${index}`;

      return <CardSkeleton key={key} />;
    })}
  </>
);

const DeploymentsSettings = () => {
  const dispatch = useDispatch();
  const {data: fleets, isLoading: isLoadingFleet} = useGetEnvoyFleetsQuery({});
  const {data: services, isLoading: isLoadingServices} = useGetServicesQuery({});
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
        <Button type="primary" onClick={onAddDeploymentClickHandler}>
          Add deployment fleet
        </Button>
      </S.Header>
      <S.Deployments>
        {isLoadingServices || isLoadingFleet ? (
          <FleetsSkelton />
        ) : (
          deployments?.map(deployment => (
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
          ))
        )}
      </S.Deployments>
    </>
  );
};

const serviceTypeLabel = (type: 'LoadBalancer' | 'ClusterIP') => {
  return type === 'LoadBalancer' ? `Public - ${type}` : `Private - ${type}`;
};

export default DeploymentsSettings;
