import {Form, FormInstance, Select, Tag} from 'antd';

import {useGetEnvoyFleetsQuery} from '@redux/services/enhancedApi';

interface IProps {
  form: FormInstance<any>;
}

const FleetInfo: React.FC<IProps> = props => {
  const {form} = props;

  const {data: fleetData} = useGetEnvoyFleetsQuery({});

  return (
    <Form.Item
      label="Target Envoy Fleet"
      name="targetEnvoyFleet"
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
