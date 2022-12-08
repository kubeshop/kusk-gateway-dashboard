import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Form, Steps} from 'antd';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {AppRoutes} from '@constants/AppRoutes';

import {AlertEnum} from '@models/alert';
import {StaticRoute} from '@models/main';

import {setAlert} from '@redux/reducers/alert';
import {closeStaticRouteModal} from '@redux/reducers/ui';
import {useCreateStaticRouteMutation} from '@redux/services/enhancedApi';

import {TargetForm} from '@components/TargetForm';

import RouteInfo from './RouteInfoForm';

import * as S from './styled';

const AddStaticRouteModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [createStaticRoute, {isError, reset}] = useCreateStaticRouteMutation();
  const [currentStep, setCurrentStep] = useState(0);
  const step = currentStep === 0 ? 'routeInfo' : 'targetInfo';

  const okText = currentStep === 0 ? 'Add target' : 'Create static route';

  const onSubmitHandler = async () => {
    try {
      await form.validateFields();
      if (step !== 'targetInfo') {
        setCurrentStep(currentStep + 1);
        return;
      }
      const {name, namespace, deployment, upstream, redirect} = await form.getFieldsValue(true);

      const newStaticRouteDefinition: StaticRoute = {
        apiVersion: 'gateway.kusk.io/v1alpha1',
        kind: 'StaticRoute',
        metadata: {
          name,
        },
        spec: {
          fleet: {
            name: deployment.split(',')[1],
            namespace: deployment.split(',')[0],
          },
          upstream,
          redirect,
          hosts: [],
        },
      };

      const result = await createStaticRoute({
        body: {
          name,
          namespace,
          envoyFleetNamespace: deployment.split(',')[0],
          envoyFleetName: deployment.split(',')[1],
          openapi: YAML.stringify(cleanDeep(newStaticRouteDefinition)),
        },
      }).unwrap();
      dispatch(
        setAlert({
          title: 'Static route deployed successfully',
          description: `${name} was deployed successfully in ${namespace} namespace`,
          type: AlertEnum.Success,
        })
      );
      dispatch(closeStaticRouteModal());
      navigate(`${AppRoutes.STATIC_ROUTE}/${result.namespace}/${result.name}`);
    } catch (e: any) {
      dispatch(
        setAlert({
          title: 'Unable to deploy Static Route',
          description: e?.message,
          type: AlertEnum.Error,
        })
      );
    }
  };

  const onBackHandler = () => {
    dispatch(closeStaticRouteModal());
  };

  const onStepClickHandler = async (value: number) => {
    await form.validateFields();
    setCurrentStep(value);
  };

  return (
    <S.Modal
      open
      title="Create static route"
      width="824px"
      onCancel={onBackHandler}
      okText={okText}
      onOk={onSubmitHandler}
    >
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical" current={currentStep}>
            <Steps.Step title="Route info" onStepClick={() => onStepClickHandler(0)} />
            <Steps.Step title="Target" onStepClick={() => onStepClickHandler(1)} />
          </Steps>
        </S.StepsContainer>

        <Form
          preserve
          form={form}
          layout="vertical"
          name="staticRouteForm"
          onValuesChange={() => {
            if (isError) {
              reset();
            }
          }}
        >
          {step === 'routeInfo' && <RouteInfo />}
          {step === 'targetInfo' && <TargetForm targetTypes={['service', 'host']} />}
        </Form>
      </S.Container>
    </S.Modal>
  );
};

export default AddStaticRouteModal;
