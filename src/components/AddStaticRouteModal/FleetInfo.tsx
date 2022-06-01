import {Form, Select, Tag} from 'antd';

import {useGetEnvoyFleetsQuery} from '@redux/services/enhancedApi';

interface IProps {}

const FleetInfo: React.FC<IProps> = () => {
  const form = Form.useFormInstance();
  const {data: fleetData} = useGetEnvoyFleetsQuery({namespace: ''});

  return (
    <Form.Item
      label="Target Envoy Fleet"
      name={['fleetInfo', 'targetEnvoyFleet']}
      initialValue={form.getFieldValue('targetEnvoyFleet')}
      rules={[
        {
          required: true,
          message: 'Please select envoy fleet!',
        },
      ]}
    >
      <Select>
        {fleetData?.map(fleet => (
          <Select.Option key={fleet.name} value={`${fleet.namespace},${fleet.name}`}>
            <Tag>{fleet.namespace}</Tag>
            {fleet.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default FleetInfo;
