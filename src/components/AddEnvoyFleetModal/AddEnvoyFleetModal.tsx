import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {Button, Form, Input, Radio, Select, Space, Steps} from 'antd';

import {CheckCircleOutlined, InfoCircleOutlined, MinusCircleOutlined} from '@ant-design/icons';

import {AlertEnum} from '@models/alert';
import {ServicePortItem, useCreateFleet, useGetNamespaces} from '@models/api';

import {setAlert} from '@redux/reducers/alert';
import {closeEnvoyFleetModalModal} from '@redux/reducers/ui';

import * as S from './styled';

type FormSteps = 'fleetInfo' | 'portsInfo';

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
  const {data: namespaces} = useGetNamespaces({});
  const {mutate: createFleet, loading: isLoadingNewFleet} = useCreateFleet({});
  const [activeStep, setActiveStep] = useState<FormSteps>('fleetInfo');

  const onBackHandler = () => {
    dispatch(closeEnvoyFleetModalModal());
  };

  const onStepHandler = async () => {
    const stepFields = form
      .getFieldsError()
      .map(field => field.name)
      .filter(name => name.includes(activeStep));
    await form.validateFields(stepFields);
    setActiveStep('portsInfo');
  };

  const onSubmitHandler = async () => {
    const {fleetInfo, portsInfo} = await form.validateFields();
    form.submit();
    const portsList: ServicePortItem[] = portsInfo.ports.map(p => ({
      port: Number(p),
      name: 'fleet',
      nodePort: 1,
      protocol: 'tcp',
      targetPort: p,
    }));

    try {
      await createFleet({...fleetInfo, ports: portsList, status: 'available'});
      dispatch(
        setAlert({
          title: 'The Envoy fleet deployed successfully',
          description: `${fleetInfo.name} was deployed successfully in ${fleetInfo.namespace} namespace!`,
          type: AlertEnum.Success,
        })
      );
    } catch (e) {
      dispatch(
        setAlert({
          title: 'Failed to deploy the Envoy fleet',
          description: `Something went wrong!`,
          type: AlertEnum.Error,
        })
      );
    }
  };

  return (
    <S.Modal
      visible
      title="Publish New Envoy Fleet"
      width="900px"
      onCancel={onBackHandler}
      footer={
        <>
          <Button type="text" onClick={onBackHandler}>
            Cancel
          </Button>

          <Button type="text" onClick={onStepHandler} disabled={activeStep === 'portsInfo'}>
            Next
          </Button>

          <Button type="primary" disabled={isLoadingNewFleet} onClick={onSubmitHandler}>
            {isLoadingNewFleet ? 'Publishing Fleet...' : 'Publish'}
          </Button>
        </>
      }
    >
      <Form layout="vertical" form={form}>
        <S.Container>
          <S.StepsContainer>
            <Steps direction="vertical" current={activeStep === 'fleetInfo' ? 1 : 2}>
              <Steps.Step
                title="Envoy Fleet Info"
                icon={activeStep === 'fleetInfo' ? <InfoCircleOutlined /> : <CheckCircleOutlined />}
              />
              <Steps.Step title="Envoy Fleet Ports" icon={<InfoCircleOutlined />} />
            </Steps>
          </S.StepsContainer>

          <S.FormContainer>
            <S.FormStepContainer $visible={activeStep === 'fleetInfo'}>
              <Form.Item
                name={['fleetInfo', 'name']}
                label="Name"
                rules={[{required: true, message: 'Enter envoy fleet name!'}]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={['fleetInfo', 'namespace']}
                label="Namespace"
                rules={[{required: true, message: 'Enter target namespace!'}]}
              >
                <Select>
                  {namespaces?.map(namespace => (
                    <Select.Option value={namespace.name}>{namespace.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name={['fleetInfo', 'serviceType']}
                label="Service type"
                rules={[{required: true, message: 'Select service type!'}]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="LoadBalancer">LoadBalancer</Radio>
                    <Radio value="ClusterIP">ClusterIP</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </S.FormStepContainer>

            <S.FormStepContainer $visible={activeStep === 'portsInfo'}>
              <Form.Item
                name="checkPorts"
                rules={[
                  ({getFieldValue}) => ({
                    validator() {
                      if (getFieldValue(['portsInfo', 'ports'])?.length === 0) {
                        return Promise.reject(new Error('Add one port at least'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Form.List name={['portsInfo', 'ports']}>
                  {(fields, {add, remove}) => (
                    <div>
                      {fields.map(field => (
                        <Form.Item
                          name={[field.name]}
                          rules={[{required: true, min: 1, max: 65535, message: 'type port number!'}]}
                        >
                          <div style={{display: 'flex', alignItems: 'center', gap: 16, margin: '4px 0'}}>
                            <Input style={{width: 200}} placeholder="type port number!" type="number" />
                            <MinusCircleOutlined style={{fontSize: 16}} onClick={() => remove(field.name)} />
                          </div>
                        </Form.Item>
                      ))}
                      <Button onClick={add}>Add Port</Button>
                    </div>
                  )}
                </Form.List>
              </Form.Item>
            </S.FormStepContainer>
          </S.FormContainer>
        </S.Container>
      </Form>
    </S.Modal>
  );
};

export default AddEnvoyFleetModal;
