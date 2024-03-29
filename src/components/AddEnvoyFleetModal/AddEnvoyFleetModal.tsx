import {useDispatch} from 'react-redux';

import {Button, Form, Input, Radio, Select, Space, Typography} from 'antd';

import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';

import {AlertEnum} from '@models/alert';

import {setAlert} from '@redux/reducers/alert';
import {closeEnvoyFleetModalModal} from '@redux/reducers/ui';
import {useCreateFleetMutation, useGetNamespacesQuery, useGetServicesQuery} from '@redux/services/enhancedApi';
import {GetServiceApiResponse} from '@redux/services/kuskApi';

import * as S from './styled';

interface FleetForm {
  fleetInfo: {
    name: string;
    namespace: string;
    serviceType: 'LoadBalancer' | 'ClusterIP';
  };
  portsInfo: {
    ports: Array<string>;
  };
}

const AddEnvoyFleetModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<FleetForm>();
  const {data: namespaces} = useGetNamespacesQuery();
  const {data: services} = useGetServicesQuery({});

  const [createFleet, {isLoading: isLoadingNewFleet, isError, reset}] = useCreateFleetMutation();

  const onBackHandler = () => {
    dispatch(closeEnvoyFleetModalModal());
  };

  const onSubmitHandler = async () => {
    try {
      await form.validateFields();
      const {fleetInfo, portsInfo} = await form.getFieldsValue(true);
      form.submit();
      const portsList = portsInfo.ports.map((p: any) => ({
        port: Number(p.port),
        name: 'fleet',
        targetPort: 'http',
      }));

      await createFleet({serviceItem: {...fleetInfo, ports: portsList, status: 'available'}}).unwrap();
      dispatch(closeEnvoyFleetModalModal());
      dispatch(
        setAlert({
          title: 'The Envoy fleet deployed successfully',
          description: `${fleetInfo.name} was deployed successfully in ${fleetInfo.namespace} namespace`,
          type: AlertEnum.Success,
        })
      );
    } catch (e: any) {
      dispatch(
        setAlert({
          title: 'Unable to create deployment',
          description: e?.message,
          type: AlertEnum.Error,
        })
      );
    }
  };

  return (
    <S.Modal
      open
      title={<Typography.Title level={3}>Add a deployment fleet</Typography.Title>}
      width="600px"
      onCancel={onBackHandler}
      footer={
        <>
          <Button type="text" onClick={onBackHandler}>
            Cancel
          </Button>

          <Button type="primary" disabled={isLoadingNewFleet} onClick={onSubmitHandler}>
            Add deployment fleet
          </Button>
        </>
      }
    >
      <Form
        preserve
        layout="vertical"
        form={form}
        onValuesChange={() => {
          if (isError) {
            reset();
          }
        }}
      >
        <S.Container>
          <S.FormContainer>
            <Form.Item
              required
              name={['fleetInfo', 'name']}
              label="Name"
              rules={[
                {required: true, message: 'Enter name'},
                {
                  pattern: /^[a-z0-9].*[a-z0-9]$/gi,
                  message: 'Name must start and end with an alphanumerical character',
                },
                {
                  pattern: /^[a-z0-9]$|^([a-z0-9\-])*[a-z0-9]$/,
                  message: 'Name must contain only lowercase alphanumerical characters or "-"',
                },
                {max: 64, type: 'string', message: 'Maximum 64 characters'},
                () => {
                  return {
                    validator(_, value) {
                      const namespace = form.getFieldValue(['fleetInfo', 'namespace']);

                      if (namespace && checkDuplicateService(services || [], `${namespace}-${value}`)) {
                        return Promise.reject(new Error(`API name is already used in ${namespace} cluster`));
                      }

                      return Promise.resolve();
                    },
                  };
                },
              ]}
              dependencies={[['fleetInfo', 'namespace']]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              required
              name={['fleetInfo', 'namespace']}
              label="Cluster service"
              rules={[{required: true, message: 'Enter target cluster'}]}
            >
              <Select>
                {namespaces?.map(namespace => (
                  <Select.Option key={`KEY_${namespace.name}`} value={namespace.name}>
                    {namespace.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              required
              name={['fleetInfo', 'serviceType']}
              label="Service type"
              rules={[{required: true, message: 'Select service type'}]}
            >
              <Radio.Group>
                <Space direction="horizontal">
                  <Radio value="LoadBalancer">Public - Load Balancer</Radio>
                  <Radio value="ClusterIP">Private - Cluster IP</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item required label="Port">
              <Form.List name={['portsInfo', 'ports']} initialValue={[{}]}>
                {(fields, {add, remove}) => (
                  <div>
                    {fields.map((field, index) => (
                      <Form.Item
                        key={`${field.name}`}
                        name={[field.name, 'port']}
                        rules={[
                          {required: true, min: 1, max: 65535, message: 'Port range between 1 to 65535'},
                          ({getFieldValue}) => ({
                            validator(_, value) {
                              if (
                                getFieldValue(['fleetInfo', 'serviceType']) === 'LoadBalancer' &&
                                services?.some(service => service.ports.some(p => p.port === Number(value)))
                              ) {
                                return Promise.reject(Error('Port is Already taken'));
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <S.PortItem>
                          <Input placeholder="Ex: 443" type="number" />

                          <DeleteOutlined
                            style={{fontSize: 16}}
                            disabled={index === 0}
                            onClick={() => index !== 0 && remove(field.name)}
                          />
                        </S.PortItem>
                      </Form.Item>
                    ))}
                    <S.AddPortButton type="text" onClick={add} icon={<PlusOutlined />}>
                      Add Port
                    </S.AddPortButton>
                  </div>
                )}
              </Form.List>
            </Form.Item>
          </S.FormContainer>
        </S.Container>
      </Form>
    </S.Modal>
  );
};

const checkDuplicateService = (services: GetServiceApiResponse[], apiKey: string) =>
  services.find(service => `${service.namespace}-${service.name}` === apiKey);

export default AddEnvoyFleetModal;
