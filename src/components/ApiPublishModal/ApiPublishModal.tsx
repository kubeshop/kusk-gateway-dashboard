import {Suspense, lazy, useEffect, useMemo, useState} from 'react';
import {useTracking} from 'react-tracking';

import {Button, Form, Radio, Skeleton, Steps} from 'antd';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {AlertEnum} from '@models/alert';
import {ANALYTIC_TYPE, Events} from '@models/analytics';
import {ApiContent} from '@models/main';
import {StepType} from '@models/ui';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {setNewApiFormContent} from '@redux/reducers/main';
import {
  closeApiPublishModal,
  setApiPublishModalActiveStep,
  setApiPublishModalLastCompletedStep,
} from '@redux/reducers/ui';
import {useDeployApiMutation} from '@redux/services/enhancedApi';
import {ApiItem} from '@redux/services/kuskApi';

import FleetInfo from './FleetInfo';
import Step from './Step';

import * as S from './styled';

const CORS = lazy(() => import('./extensions/CORS'));
const ApiSettings = lazy(() => import('./ApiSettings'));
const OpenApiSpec = lazy(() => import('./OpenApiSpec'));
const Hosts = lazy(() => import('./extensions/Hosts'));
const QOS = lazy(() => import('./extensions/QOS'));
const Redirect = lazy(() => import('./extensions/Redirect'));
const Upstream = lazy(() => import('./extensions/Upstream'));
const Cache = lazy(() => import('./extensions/Cache'));
const RateLimiting = lazy(() => import('./extensions/RateLimiting'));
const BasicAuthentication = lazy(() => import('./extensions/BasicAuthentication'));

interface StepItem {
  step: StepType;
  title: string;
  documentationLink?: string;
}

const renderedNextButtonText: {[key: number]: string} = {
  0: 'Add API Settings',
  1: 'Add Fleet Info',
  2: 'Add Target',
  3: 'Add Hosts',
  4: 'Add QOS',
  5: 'Add CORS',
  6: 'Add Cache',
  7: 'Add Rate Limiting',
  8: 'Add Authentication',
  9: 'Publish',
};

const orderedSteps: StepType[] = [
  'openApiSpec',
  'apiSettings',
  'fleetInfo',
  'target',
  'hosts',
  'qos',
  'cors',
  'caching',
  'rateLimiting',
  'authentication',
];

const ApiPublishModal: React.FC = () => {
  const {trackEvent} = useTracking(
    {eventName: Events.PUBLISH_API_MODAL_LOADED, type: ANALYTIC_TYPE.ACTION},
    {dispatchOnMount: true}
  );
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(state => state.ui.apiPublishModal.activeStep);
  const apiFormContent = useAppSelector(state => state.main.newApiFormContent);
  const lastCompletedStep = useAppSelector(state => state.ui.apiPublishModal.lastCompletedStep);

  const [errorMessage, setErrorMessage] = useState<string>();
  const isApiMocked = Form.useWatch(['mocking', 'enabled']);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isPublishDisabled, setIsPublishedDisabled] = useState<boolean>(true);
  const [redirectTabSelection, setRedirectTabSelection] = useState<string>('path_redirect');
  const [targetSelection, setTargetSelection] = useState<string>('upstream');
  const [upstreamReference, setUpstreamReference] = useState<string>('service');

  const [deployAPI] = useDeployApiMutation();

  const [form] = Form.useForm();

  const activeStepIndex = useMemo(() => orderedSteps.indexOf(activeStep), [activeStep]);

  const steps: StepItem[] = useMemo(
    () => [
      {documentationLink: 'https://swagger.io/specification', step: 'openApiSpec', title: 'OpenAPI Spec'},
      {step: 'apiSettings', title: 'API Settings'},
      {
        step: 'fleetInfo',
        title: 'Fleet Info',
        documentationLink: `https://kubeshop.github.io/kusk-gateway/customresources/envoyfleet/`,
      },
      {
        documentationLink: `https://kubeshop.github.io/kusk-gateway/reference/extension/#${targetSelection}`,
        step: 'target',
        title: 'Target',
      },
      {step: 'hosts', title: 'Hosts'},
      {step: 'qos', title: 'QOS'},
      {step: 'cors', title: 'CORS'},
      {step: 'caching', title: 'Caching'},
      {
        step: 'rateLimiting',
        title: 'Rate Limiting',
        documentationLink: 'https://kubeshop.github.io/kusk-gateway/reference/extension/#rate-limiting',
      },
      {step: 'authentication', title: 'Authentication'},
    ],
    [targetSelection]
  );

  const renderedSteps = useMemo(
    () =>
      steps.map(step => (
        <Step
          key={step.step}
          documentationLink={step.documentationLink}
          isApiMocked={isApiMocked}
          orderedSteps={orderedSteps}
          step={step.step}
          title={step.title}
        />
      )),
    [isApiMocked, steps]
  );

  const onCancelHandler = () => {
    dispatch(setNewApiFormContent(form.getFieldsValue(true)));
    dispatch(closeApiPublishModal());
  };

  const onNextStepHandler = async () => {
    const values = await form.validateFields();
    dispatch(setApiPublishModalActiveStep(orderedSteps[orderedSteps.indexOf(activeStep) + 1]));

    if (activeStep === 'openApiSpec') {
      const {mocking} = values;

      const updatedMocking = mocking.enabled !== apiFormContent?.openapi['x-kusk']?.mocking?.enabled;

      if (updatedMocking) {
        dispatch(setApiPublishModalLastCompletedStep(activeStep));
      }
    }

    if (orderedSteps.indexOf(lastCompletedStep) < orderedSteps.indexOf(activeStep)) {
      dispatch(setApiPublishModalLastCompletedStep(activeStep));
    }
  };

  const onSubmitHandler = async () => {
    await form.validateFields();
    const values = await form.getFieldsValue(true);
    setIsPublishing(true);

    const {openapi, mocking, name, namespace, targetEnvoyFleet, validation, path, websocket, hosts, qos, cors} = values;

    let parsedOpenApi = YAML.parse(JSON.parse(JSON.stringify(openapi)));

    let xKusk: {[key: string]: any} = {mocking, validation, path, websocket, hosts, qos, cors};

    let newApiContent: ApiContent = {
      name,
      namespace: namespace || 'default',
      envoyFleetNamespace: targetEnvoyFleet.split(',')[0],
      envoyFleetName: targetEnvoyFleet.split(',')[1],
      openapi: parsedOpenApi,
    };

    const {redirect, upstream} = values;

    if (targetSelection === 'redirect') {
      xKusk.redirect = redirect;

      if (redirectTabSelection === 'path_redirect') {
        delete xKusk.redirect['rewrite_regex'];
      } else {
        delete xKusk.redirect['path_redirect'];
      }

      if (xKusk.upstream) {
        delete xKusk.upstream;
      }
    } else {
      xKusk.upstream = upstream;

      if (upstreamReference === 'service') {
        delete xKusk.upstream.host;
        xKusk.upstream.service.port = parseInt(upstream.service.port, 10);
      } else {
        delete xKusk.upstream.service;
      }

      if (xKusk.redirect) {
        delete xKusk.redirect;
      }
    }

    const {cache} = values;
    if (cache?.enabled) {
      xKusk.cache = cache;
    }

    const {rateLimit} = values;
    if (rateLimit?.enabled) {
      delete rateLimit.enabled;

      xKusk.rate_limit = rateLimit;
    }

    const {auth} = values;
    if (auth?.enabled) {
      delete auth.enabled;
      xKusk.auth = auth;
    }

    newApiContent.openapi['x-kusk'] = xKusk;

    if (isApiMocked && newApiContent?.openapi && newApiContent.openapi['x-kusk']) {
      delete newApiContent.openapi['x-kusk'].validation;
    }

    const body = {
      name: newApiContent.name,
      namespace: newApiContent.namespace,
      envoyFleetName: newApiContent.envoyFleetName,
      envoyFleetNamespace: newApiContent.envoyFleetNamespace,
      openapi: YAML.stringify(cleanDeep(newApiContent.openapi)),
    };

    deployAPI({body})
      .unwrap()
      .then((response: any) => {
        const apiData: ApiItem = response;

        dispatch(closeApiPublishModal());
        dispatch(setApiPublishModalActiveStep('openApiSpec'));
        dispatch(setApiPublishModalLastCompletedStep('openApiSpec'));
        dispatch(setNewApiFormContent(null));

        dispatch(
          setAlert({
            title: 'API deployed successfully',
            description: `${apiData.name} was deployed successfully in ${apiData.namespace} namespace!`,
            type: AlertEnum.Success,
          })
        );
      })
      .catch(err => {
        setErrorMessage(err.data);
        setIsPublishing(false);
      });

    trackEvent({eventName: Events.PUBLISH_API_SUBMITTED, type: ANALYTIC_TYPE.ACTION});
  };

  const onBackHandler = () => {
    dispatch(setApiPublishModalActiveStep(orderedSteps[orderedSteps.indexOf(activeStep) - 1]));
    setErrorMessage('');
    trackEvent({eventName: Events.PUBLISH_API_MODAL_DISMISSED, type: ANALYTIC_TYPE.ACTION});
  };

  useEffect(() => {
    if (activeStep !== 'target' || !apiFormContent) {
      return;
    }

    if (!apiFormContent?.upstream && apiFormContent?.redirect) {
      setTargetSelection('redirect');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  useEffect(() => {
    if (activeStepIndex > 2 && isPublishDisabled) {
      setIsPublishedDisabled(false);
    } else if ((activeStepIndex <= 1 && !isApiMocked && !isPublishDisabled) || !activeStepIndex) {
      setIsPublishedDisabled(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStepIndex]);

  useEffect(() => {
    form.setFieldsValue(apiFormContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Modal
      footer={
        <>
          {activeStep !== 'openApiSpec' ? (
            <Button type="text" onClick={onBackHandler}>
              Back
            </Button>
          ) : null}

          {activeStep !== 'authentication' ? (
            <Button type="default" onClick={onNextStepHandler}>
              {renderedNextButtonText[activeStepIndex]}
            </Button>
          ) : null}

          <Button type="primary" disabled={isPublishDisabled || isPublishing} onClick={onSubmitHandler}>
            {isPublishing ? 'Publishing API...' : 'Publish'}
          </Button>
        </>
      }
      title="Publish New API"
      visible
      width="900px"
      onCancel={onCancelHandler}
    >
      {errorMessage && <S.Alert description={errorMessage} message="Error" showIcon type="error" />}

      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical" current={activeStepIndex}>
            {renderedSteps}
          </Steps>
        </S.StepsContainer>

        <S.FormContainer>
          <Form
            preserve
            form={form}
            initialValues={{openapi: ''}}
            layout="vertical"
            onValuesChange={() => {
              if (errorMessage) {
                setErrorMessage('');
              }
            }}
          >
            <Suspense fallback={<Skeleton />}>
              {activeStep === 'openApiSpec' && <OpenApiSpec />}
              {activeStep === 'apiSettings' && <ApiSettings />}
              {activeStep === 'fleetInfo' && <FleetInfo form={form} />}

              {activeStep === 'target' && (
                <>
                  <S.RadioGroupContainer>
                    <S.Label>Target</S.Label>
                    <Radio.Group
                      name="target"
                      value={targetSelection}
                      onChange={e => setTargetSelection(e.target.value)}
                    >
                      <Radio value="upstream">Upstream</Radio>
                      <Radio value="redirect">Redirect</Radio>
                    </Radio.Group>
                  </S.RadioGroupContainer>

                  {targetSelection === 'upstream' ? (
                    <Upstream
                      reference={upstreamReference}
                      setReference={reference => setUpstreamReference(reference)}
                      isRequiredFields={!isApiMocked}
                    />
                  ) : (
                    <Redirect
                      selectedTab={redirectTabSelection}
                      setSelectedTab={tabKey => setRedirectTabSelection(tabKey)}
                      isRequiredFields={!isApiMocked}
                    />
                  )}
                </>
              )}

              {activeStep === 'hosts' && <Hosts />}
              {activeStep === 'qos' && <QOS />}
              {activeStep === 'cors' && <CORS form={form} />}
              {activeStep === 'caching' && <Cache />}
              {activeStep === 'rateLimiting' && <RateLimiting />}
              {activeStep === 'authentication' && <BasicAuthentication />}
            </Suspense>
          </Form>
        </S.FormContainer>
      </S.Container>
    </S.Modal>
  );
};

export default ApiPublishModal;
