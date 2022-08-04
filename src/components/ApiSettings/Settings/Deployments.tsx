import {Form, Select, Tag} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {useGetEnvoyFleetsQuery} from '@redux/services/enhancedApi';

import {FormCard} from '@components/FormCard';

import * as S from './styled';

const Deployments = () => {
  const {data: fleets} = useGetEnvoyFleetsQuery({});
  const selectedAPI = useAppSelector(state => state.main.selectedApi);

  return (
    <FormCard
      heading="Deployments"
      subHeading="Select which environment to deploy this API to"
      helpTopic="Environments and Envoy Fleet"
      helpLink="https://kubeshop.github.io/kusk-gateway/customresources/envoyfleet/"
    >
      <Form.Item
        name="envoyFleet"
        initialValue={`${selectedAPI?.fleet.namespace},${selectedAPI?.fleet.name}`}
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

      <S.Divider />
    </FormCard>
  );
};

export default Deployments;
