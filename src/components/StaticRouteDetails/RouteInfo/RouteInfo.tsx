import {Form, Select, Tag} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {useGetEnvoyFleetsQuery} from '@redux/services/enhancedApi';

import {FormCard} from '@components/FormCard';

import * as S from './styled';

const RouteInfo = () => {
  const {data: fleets, isLoading} = useGetEnvoyFleetsQuery({});
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);

  return isLoading ? null : (
    <S.Container>
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
