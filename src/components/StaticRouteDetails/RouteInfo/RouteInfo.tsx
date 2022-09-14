import {useDispatch} from 'react-redux';

import {Form, Input, Select, Tag} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {updateStaticRouteSettings} from '@redux/reducers/main';
import {useGetEnvoyFleetsQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormCard';

import * as S from './styled';

const RouteInfo = () => {
  const dispatch = useDispatch();
  const {data: namespaces, isLoading: isLoadingNamespaces} = useGetNamespacesQuery();
  const {data: fleets, isLoading} = useGetEnvoyFleetsQuery({});
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);

  const onSubmitClickHandler = (values: any) => {
    const {envoyFleet} = values;
    const [fleetNamespace, fleetName] = envoyFleet.split(',') || '';

    dispatch(
      updateStaticRouteSettings({
        editedOpenapi: {
          fleetName,
          fleetNamespace,
        },
      })
    );
  };

  return isLoading || isLoadingNamespaces ? null : (
    <S.Container>
      <FormCard
        heading="Route Information"
        subHeading=""
        formProps={{layout: 'vertical', onFinish: onSubmitClickHandler}}
      >
        <Form.Item
          name="name"
          label="Name"
          required
          dependencies={['namespace']}
          rules={[
            {required: true, message: 'Enter API name!'},
            {pattern: /^[a-z0-9]$|^([a-z0-9\-])*[a-z0-9]$/, message: 'Wrong pattern!'},
            {max: 63, type: 'string', message: 'Name is too long!'},
          ]}
          initialValue={selectedRouteSpec?.metadata?.name}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="namespace"
          label="Namespace"
          rules={[{required: true, message: 'Select target namespace'}]}
          initialValue={selectedRouteSpec?.metadata?.namespace}
        >
          <Select disabled>
            {namespaces?.map(namespace => (
              <Select.Option key={namespace.name} value={namespace.name}>
                {namespace.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="envoyFleet"
          label="Deployment fleet"
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
        <Divider />
      </FormCard>
    </S.Container>
  );
};

export default RouteInfo;
