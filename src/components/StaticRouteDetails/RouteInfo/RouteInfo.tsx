import {Form, Input, Select, Tag} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {useGetEnvoyFleetsQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';

import {FormCard} from '@components/FormCard';

import * as S from './styled';

const RouteInfo = () => {
  const {data: namespaces} = useGetNamespacesQuery();
  const {data: fleets} = useGetEnvoyFleetsQuery({});
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);

  return (
    <S.Container>
      <FormCard
        heading="Display name"
        subHeading="Please provide the display name of your API"
        formProps={{disabled: true}}
      >
        <Form.Item name="name" initialValue={selectedRouteSpec?.metadata?.name}>
          <Input placeholder="My first API being renamed" />
        </Form.Item>
      </FormCard>

      <FormCard
        heading="Namespace"
        subHeading="Define which namespace and labels this API is assigned to"
        helpTopic="Namespaces"
        helpLink="https://kubeshop.github.io/kusk-gateway/customresources/api/"
        formProps={{layout: 'vertical', disabled: true}}
      >
        <Form.Item label="Namespace" name="namespace" initialValue={selectedRouteSpec?.metadata?.namespace}>
          <Select placeholder="namespace">
            {namespaces?.map(el => (
              <Select.Option key={el.name} value={el.name}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </FormCard>

      <FormCard
        heading="Deployments"
        subHeading="Select which environment to deploy this API to"
        helpTopic="Environments and Envoy Fleet"
        helpLink="https://kubeshop.github.io/kusk-gateway/customresources/envoyfleet/"
      >
        <Form.Item
          name="envoyFleet"
          initialValue={`${selectedRouteSpec?.spec?.fleet?.namespace},${selectedRouteSpec?.spec?.fleet?.name}`}
          rules={[
            {
              required: true,
              message: 'Please select envoy fleet!',
            },
          ]}
        >
          <Select>
            {fleets?.map(fleet => (
              <Select.Option key={fleet.name} value={`${fleet.namespace},${fleet.name}`}>
                <Tag>{fleet.namespace}</Tag>
                {fleet.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </FormCard>
    </S.Container>
  );
};

export default RouteInfo;
