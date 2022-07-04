import {useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTracking} from 'react-tracking';

import {Button, Form, Steps} from 'antd';

import YAML from 'yaml';

import {AlertEnum} from '@models/alert';
import {ANALYTIC_TYPE, Events} from '@models/analytics';
import {PathMatch, StaticRoute, StaticRouteForm} from '@models/main';
import {StaticRouteStepType} from '@models/ui';

import {setAlert} from '@redux/reducers/alert';
import {closeStaticRouteModal} from '@redux/reducers/ui';
import {useCreateStaticRouteMutation} from '@redux/services/enhancedApi';

import {FormStep} from '@components/FormStep';

import {cleanEmptyFields} from '@utils/staticRoute';

import AddPathModal from './AddPathModal/AddPathModal';
import FleetInfo from './FleetInfo';
import Hosts from './Hosts';
import Paths from './Paths';
import StaticRouteInfo from './StaticRouteInfo';

import * as S from './styled';

const orderedSteps: Array<StaticRouteStepType> = ['routeInfo', 'fleetInfo', 'paths', 'hosts'];

const renderedNextButtonText: {[key: number]: string} = {
  0: 'Add Route Info',
  1: 'Add Fleet Info',
  2: 'Add Paths',
  3: 'Add Hosts',
  4: 'Publish',
};

const requiredSteps: Array<StaticRouteStepType> = ['routeInfo', 'fleetInfo', 'paths'];

const steps: Array<{step: StaticRouteStepType; title: string; documentationLink: string}> = [
  {step: 'routeInfo', title: 'Route Info', documentationLink: ''},
  {
    step: 'fleetInfo',
    title: 'Fleet Info',
    documentationLink: '',
  },
  {
    step: 'paths',
    title: 'Paths',
    documentationLink: '',
  },
  {
    step: 'hosts',
    title: 'Hosts',
    documentationLink: '',
  },
];

const AddStaticRouteModal = () => {
  const {trackEvent} = useTracking(
    {eventName: Events.PUBLISH_STATIC_ROUTES_MODAL_LOADED, type: ANALYTIC_TYPE.ACTION},
    {dispatchOnMount: true}
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm<StaticRouteForm>();
  const [openPathModal, setOpenPathModal] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<StaticRouteStepType>('routeInfo');
  const [lastVisitedStep, setLastVisitedStep] = useState<StaticRouteStepType>('routeInfo');
  const [createStaticRoute, {isLoading: isPublishingStaticRoute}] = useCreateStaticRouteMutation();

  const activeStepIndex = useMemo(() => orderedSteps.indexOf(activeStep), [activeStep]);
  const disablePublishButton = useMemo(
    () =>
      isPublishingStaticRoute ||
      (requiredSteps.includes(activeStep) && requiredSteps.indexOf(activeStep) < requiredSteps.length - 1),
    [isPublishingStaticRoute, activeStep]
  );

  const onSubmitHandler = async () => {
    await form.validateFields();
    const {routeInfo, fleetInfo, paths, hosts} = (await form.getFieldsValue(true)) as StaticRouteForm;
    try {
      const newStaticRouteDefinition: StaticRoute = {
        apiVersion: 'gateway.kusk.io/v1alpha1',
        kind: 'StaticRoute',
        metadata: {
          name: routeInfo.name,
        },
        spec: {
          fleet: {
            name: fleetInfo.targetEnvoyFleet.split(',')[1],
            namespace: fleetInfo.targetEnvoyFleet.split(',')[0],
          },
          hosts: hosts?.hosts || [],
          paths: paths.paths.reduce<Record<string, PathMatch>>((accPaths, path) => {
            const methods = path.path.methods.reduce<Partial<PathMatch>>((acc, method) => {
              acc[method] = {
                redirect: path.redirect || undefined,
                route: {
                  cors: Object.values(path.cors).some(e => e) ? path.cors : undefined,
                  qos: Object.values(path.qos).some(e => e) ? path.qos : undefined,
                  upstream: path.upstream || undefined,
                  websocket: path.websocket.websocket || undefined,
                },
              };
              return acc;
            }, {});

            accPaths[path.path.name] = {
              ...methods,
            };
            return accPaths;
          }, {}),
        },
      };
      await createStaticRoute({
        body: {
          name: routeInfo.name,
          namespace: routeInfo.namespace,
          envoyFleetNamespace: fleetInfo.targetEnvoyFleet.split(',')[0],
          envoyFleetName: fleetInfo.targetEnvoyFleet.split(',')[1],
          openapi: YAML.stringify(cleanEmptyFields(JSON.parse(JSON.stringify(newStaticRouteDefinition)))),
        },
      }).unwrap();
      dispatch(
        setAlert({
          title: 'Static route deployed successfully',
          description: `${routeInfo.name} was deployed successfully in ${routeInfo.namespace} namespace!`,
          type: AlertEnum.Success,
        })
      );
      dispatch(closeStaticRouteModal());
    } catch (e) {
      dispatch(
        setAlert({
          title: "couldn't create the static route",
          description: `Something went wrong!`,
          type: AlertEnum.Error,
        })
      );
    }
    trackEvent({eventName: Events.PUBLISH_STATIC_ROUTES_SUBMITTED, type: ANALYTIC_TYPE.ACTION});
  };

  const onBackHandler = () => {
    dispatch(closeStaticRouteModal());
    trackEvent({eventName: Events.PUBLISH_STATIC_ROUTES_MODAL_DISMISSED, type: ANALYTIC_TYPE.ACTION});
  };

  const handleNextStep = async () => {
    const stepPath = activeStep;
    const stepFields = form
      .getFieldsError()
      .map(el => el.name)
      .filter(el => el[0] === stepPath);
    await form.validateFields(stepFields);
    setLastVisitedStep(activeStep);
    setActiveStep(orderedSteps[activeStepIndex + 1]);
  };

  return (
    <S.Modal
      visible
      title="Publish Static Route"
      width="900px"
      onCancel={onBackHandler}
      footer={
        <>
          <Button type="text" onClick={onBackHandler}>
            Cancel
          </Button>

          {activeStep !== 'hosts' ? (
            <Button type="default" onClick={handleNextStep}>
              {renderedNextButtonText[activeStepIndex + 1]}
            </Button>
          ) : null}

          <Button
            type="primary"
            disabled={disablePublishButton}
            loading={isPublishingStaticRoute}
            onClick={onSubmitHandler}
          >
            {isPublishingStaticRoute ? 'Publishing Route...' : 'Publish'}
          </Button>
        </>
      }
    >
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical" current={activeStepIndex}>
            {steps.map(step => (
              <FormStep
                key={step.step}
                documentationLink={step.documentationLink}
                orderedSteps={orderedSteps}
                activeStep={activeStep}
                lastCompletedStep={lastVisitedStep}
                setActiveStep={setActiveStep}
                step={step.step}
                title={step.title}
              />
            ))}
          </Steps>
        </S.StepsContainer>

        <S.FormContainer>
          <Form.Provider
            onFormFinish={(name, {forms, values}) => {
              if (name === 'addPathForm') {
                const {staticRouteForm} = forms;
                const paths = staticRouteForm.getFieldValue(['paths', 'paths']) || [];
                staticRouteForm.setFieldsValue({paths: {paths: [...paths, values]}});
              }
            }}
          >
            <Form preserve form={form} layout="vertical" name="staticRouteForm">
              {activeStep === 'routeInfo' && <StaticRouteInfo />}

              {activeStep === 'fleetInfo' && <FleetInfo />}

              {activeStep === 'hosts' && <Hosts />}

              {activeStep === 'paths' && <Paths setAddPathModal={setOpenPathModal} />}
            </Form>
            {openPathModal && <AddPathModal setAddPathModal={setOpenPathModal} />}
          </Form.Provider>
        </S.FormContainer>
      </S.Container>
    </S.Modal>
  );
};

export default AddStaticRouteModal;
