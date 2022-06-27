import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTracking} from 'react-tracking';

import {Button, Form, Input, Radio, Select, Space, Steps} from 'antd';

import {AlertEnum} from '@models/alert';
import {ANALYTIC_TYPE, Events} from '@models/analytics';

import {setAlert} from '@redux/reducers/alert';
import {closeEnvoyFleetModalModal} from '@redux/reducers/ui';
import {useCreateFleetMutation, useGetNamespacesQuery} from '@redux/services/enhancedApi';

import FormStep from './FormStep';
import PortsInfo from './PortsInfo';

import * as S from './styled';

type FormStepsType = 'fleetInfo' | 'portsInfo';

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

const orderedSteps: FormStepsType[] = ['fleetInfo', 'portsInfo'];

const AddEnvoyFleetModal = () => {
  const {trackEvent} = useTracking(
    {eventName: Events.PUBLISH_ENVOY_FLEET_MODAL_LOADED, type: ANALYTIC_TYPE.ACTION},
    {dispatchOnMount: true}
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm<FleetForm>();
  const {data: namespaces} = useGetNamespacesQuery();
  const [createFleet, {isLoading: isLoadingNewFleet}] = useCreateFleetMutation();
  const [activeStep, setActiveStep] = useState<FormStepsType>('fleetInfo');

  const onBackHandler = () => {
    dispatch(closeEnvoyFleetModalModal());
    trackEvent({eventName: Events.PUBLISH_ENVOY_FLEET_MODAL_DISMISSED, type: ANALYTIC_TYPE.ACTION});
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
    const portsList = portsInfo.ports.map(p => ({
      port: Number(p),
      name: 'fleet',
      nodePort: 1,
      protocol: 'tcp',
      targetPort: p,
    }));

    try {
      await createFleet({serviceItem: {...fleetInfo, ports: portsList, status: 'available'}}).unwrap();
      dispatch(closeEnvoyFleetModalModal());
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
    trackEvent({eventName: Events.PUBLISH_ENVOY_FLEET_SUBMITTED, type: ANALYTIC_TYPE.ACTION});
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
            {orderedSteps[orderedSteps.indexOf(activeStep) + 1] || 'Next'}
          </Button>

          <Button
            type="primary"
            disabled={isLoadingNewFleet || orderedSteps[1] !== activeStep}
            onClick={onSubmitHandler}
          >
            {isLoadingNewFleet ? 'Publishing Fleet...' : 'Publish'}
          </Button>
        </>
      }
    >
      <Form layout="vertical" form={form}>
        <S.Container>
          <S.StepsContainer>
            <Steps direction="vertical" current={orderedSteps.indexOf(activeStep) + 1}>
              {orderedSteps.map(step => (
                <FormStep key={step} step={step} activeStep={activeStep} setActiveStep={setActiveStep} />
              ))}
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
              <PortsInfo />
            </S.FormStepContainer>
          </S.FormContainer>
        </S.Container>
      </Form>
    </S.Modal>
  );
};

export default AddEnvoyFleetModal;
