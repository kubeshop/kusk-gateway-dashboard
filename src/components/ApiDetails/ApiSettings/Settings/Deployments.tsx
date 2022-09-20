import {useDispatch} from 'react-redux';

import {Form, Select, Tag} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {updateApiSettings} from '@redux/reducers/main';
import {useGetEnvoyFleetsQuery} from '@redux/services/enhancedApi';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

const Deployments = () => {
  const dispatch = useDispatch();
  const {data: fleets} = useGetEnvoyFleetsQuery({});
  const selectedAPI = useAppSelector(state => state.main.selectedApi);
  const onSaveClickHandler = (values: any) => {
    const {envoyFleet} = values;
    const fleetValues = envoyFleet.split(',');
    dispatch(updateApiSettings({editedOpenapi: {envoyFleetNamespace: fleetValues[0], envoyFleetName: fleetValues[1]}}));
  };
  return (
    <FormCard
      heading="Deployments"
      subHeading="Select which environment to deploy this API to"
      helpTopic="Environments and Envoy Fleet"
      helpLink="https://kubeshop.github.io/kusk-gateway/customresources/envoyfleet/"
      formProps={{onFinish: onSaveClickHandler}}
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
