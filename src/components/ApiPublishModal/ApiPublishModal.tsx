import {Suspense, lazy, useEffect, useMemo, useState} from 'react';

import {Button, Form, Radio, Skeleton, Steps} from 'antd';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {AlertEnum} from '@models/alert';
import {ApiItem, useDeployApi} from '@models/api';
import {ApiContent} from '@models/main';
import {StepType} from '@models/ui';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {setApis, setNewApiContent} from '@redux/reducers/main';
import {
  closeApiPublishModal,
  setApiPublishModalActiveStep,
  setApiPublishModalLastCompletedStep,
} from '@redux/reducers/ui';

import FleetInfo from './FleetInfo';
import Step from './Step';

import * as S from './styled';

const ApiInfo = lazy(() => import('./ApiInfo'));
const CORS = lazy(() => import('./extensions/CORS'));
const Hosts = lazy(() => import('./extensions/Hosts'));
const OpenApiSpec = lazy(() => import('./OpenApiSpec'));
const Path = lazy(() => import('./extensions/Path'));
const QOS = lazy(() => import('./extensions/QOS'));
const Redirect = lazy(() => import('./extensions/Redirect'));
const Upstream = lazy(() => import('./extensions/Upstream'));
const Validation = lazy(() => import('./extensions/Validation'));
const Websocket = lazy(() => import('./extensions/Websocket'));

interface StepItem {
  step: StepType;
  title: string;
  documentationLink?: string;
}

const renderedNextButtonText: {[key: number]: string} = {
  0: 'Add API Info',
  1: 'Add Fleet Info',
  2: 'Add Target',
  3: 'Add Validation',
  4: 'Add Hosts',
  5: 'Add QOS',
  6: 'Add Path',
  7: 'Add CORS',
  8: 'Add Websocket',
  9: 'Publish',
};

const orderedSteps: StepType[] = [
  'openApiSpec',
  'apiInfo',
  'fleetInfo',
  'target',
  'validation',
  'hosts',
  'qos',
  'path',
  'cors',
  'websocket',
];

const ApiPublishModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(state => state.ui.apiPublishModal.activeStep);
  const apiContent = useAppSelector(state => state.main.newApiContent);
  const apis = useAppSelector(state => state.main.apis);
  const lastCompletedStep = useAppSelector(state => state.ui.apiPublishModal.lastCompletedStep);

  const [errorMessage, setErrorMessage] = useState<string>();
  const [isApiMocked, setIsApiMocked] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isPublishDisabled, setIsPublishedDisabled] = useState<boolean>(true);
  const [redirectTabSelection, setRedirectTabSelection] = useState<string>('path_redirect');
  const [targetSelection, setTargetSelection] = useState<string>('upstream');
  const [upstreamReference, setUpstreamReference] = useState<string>('service');

  const {mutate: deployAPI} = useDeployApi({});

  const [form] = Form.useForm();

  const activeStepIndex = useMemo(() => orderedSteps.indexOf(activeStep), [activeStep]);

  const steps: StepItem[] = useMemo(
    () => [
      {documentationLink: 'https://swagger.io/specification', step: 'openApiSpec', title: 'OpenAPI Spec'},
      {step: 'apiInfo', title: 'API Info'},
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
      {step: 'validation', title: 'Validation'},
      {step: 'hosts', title: 'Hosts'},
      {step: 'qos', title: 'QOS'},
      {step: 'path', title: 'Path'},
      {step: 'cors', title: 'CORS'},
      {step: 'websocket', title: 'Websocket'},
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
    dispatch(closeApiPublishModal());
  };

  const onSubmitHandler = (publish?: boolean) => {
    form.validateFields().then(values => {
      if (publish) {
        setIsPublishing(true);
      }

      let newApiContent: ApiContent | null = null;

      if (activeStep === 'openApiSpec') {
        const {openapi, mocking} = values;

        let parsedOpenApi = YAML.parse(JSON.parse(JSON.stringify(openapi)));
        parsedOpenApi = {...parsedOpenApi, 'x-kusk': {...parsedOpenApi['x-kusk'], mocking}};

        let name = apiContent?.name || formatApiName(parsedOpenApi?.info?.title) || '';
        let namespace = apiContent?.namespace || '';

        if (mocking?.enabled) {
          if (!name.startsWith('mock-')) {
            name = `mock-${name}`;
          }
        } else if (!mocking?.enabled && name.startsWith('mock-')) {
          namespace = '';

          if (name.startsWith('mock-')) {
            name = name.replace('mock-', '');
          }
        }

        newApiContent = {
          ...apiContent,
          name,
          namespace,
          openapi: parsedOpenApi,
          envoyFleetNamespace: apiContent?.envoyFleetNamespace || '',
          envoyFleetName: apiContent?.envoyFleetNamespace || '',
        };
      }

      if (apiContent) {
        if (activeStep === 'apiInfo') {
          const {name, namespace} = values;

          newApiContent = {
            ...newApiContent,
            name,
            namespace: namespace || 'default',
            openapi: apiContent.openapi,

            envoyFleetNamespace: apiContent?.envoyFleetNamespace || '',
            envoyFleetName: apiContent?.envoyFleetNamespace || '',
          };
        }

        if (activeStep === 'fleetInfo') {
          const {targetEnvoyFleet} = values;

          newApiContent = {
            ...apiContent,
            envoyFleetNamespace: targetEnvoyFleet.split(',')[0],
            envoyFleetName: targetEnvoyFleet.split(',')[1],
          };
        }

        if (activeStep === 'target') {
          const {redirect, upstream} = values;

          let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk']}};

          if (targetSelection === 'redirect') {
            if (redirect['port_redirect']) {
              redirect['port_redirect'] = parseInt(redirect['port_redirect'], 10);
            }

            if (redirect['response_code']) {
              redirect['response_code'] = parseInt(redirect['response_code'], 10);
            }

            openApiSpec['x-kusk'].redirect = redirect;

            if (redirectTabSelection === 'path_redirect') {
              delete openApiSpec['x-kusk'].redirect['rewrite_regex'];
            } else {
              delete openApiSpec['x-kusk'].redirect['path_redirect'];
            }

            if (openApiSpec['x-kusk'].upstream) {
              delete openApiSpec['x-kusk'].upstream;
            }
          } else {
            openApiSpec['x-kusk'].upstream = upstream;

            if (upstreamReference === 'service') {
              delete openApiSpec['x-kusk'].upstream.host;
              openApiSpec['x-kusk'].upstream.service.port = parseInt(upstream.service.port, 10);
            } else {
              delete openApiSpec['x-kusk'].upstream.service;
              openApiSpec['x-kusk'].upstream.host.port = parseInt(upstream.host.port, 10);
            }

            if (openApiSpec['x-kusk'].redirect) {
              delete openApiSpec['x-kusk'].redirect;
            }
          }

          newApiContent = {...apiContent, openapi: openApiSpec};
        }

        if (activeStep === 'validation') {
          const {validation} = values;

          let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], validation}};
          newApiContent = {...apiContent, openapi: openApiSpec};
        }

        if (activeStep === 'hosts') {
          const {hosts} = values;

          let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], hosts}};
          newApiContent = {...apiContent, openapi: openApiSpec};
        }

        if (activeStep === 'qos') {
          const {qos} = values;

          if (qos['idle_timeout']) {
            qos['idle_timeout'] = parseInt(qos['idle_timeout'], 10);
          }

          if (qos['retries']) {
            qos['retries'] = parseInt(qos['retries'], 10);
          }

          if (qos['request_timeout']) {
            qos['request_timeout'] = parseInt(qos['request_timeout'], 10);
          }

          let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], qos}};
          newApiContent = {...apiContent, openapi: openApiSpec};
        }

        if (activeStep === 'path') {
          const {path} = values;

          let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], path}};
          newApiContent = {...apiContent, openapi: openApiSpec};
        }

        if (activeStep === 'cors') {
          const {cors} = values;

          if (cors['max_age']) {
            cors['max_age'] = parseInt(cors['max_age'], 10);
          }

          let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], cors}};
          newApiContent = {...apiContent, openapi: openApiSpec};
        }

        if (activeStep === 'websocket') {
          const {websocket} = values;

          let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], websocket}};
          newApiContent = {...apiContent, openapi: openApiSpec};
        }
      }

      if (!publish && activeStep !== 'websocket') {
        dispatch(setNewApiContent(newApiContent));
        dispatch(setApiPublishModalActiveStep(orderedSteps[orderedSteps.indexOf(activeStep) + 1]));

        if (activeStep === 'openApiSpec') {
          const {mocking} = values;

          const updatedMocking = mocking.enabled !== apiContent?.openapi['x-kusk']?.mocking?.enabled;

          if (updatedMocking) {
            dispatch(setApiPublishModalLastCompletedStep(activeStep));
          }
        }

        if (orderedSteps.indexOf(lastCompletedStep) < orderedSteps.indexOf(activeStep)) {
          dispatch(setApiPublishModalLastCompletedStep(activeStep));
        }
      }

      if (publish && newApiContent) {
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

        deployAPI(body)
          .then((response: any) => {
            const apiData: ApiItem = response;

            dispatch(setApis([...apis, apiData]));
            dispatch(closeApiPublishModal());
            dispatch(setApiPublishModalActiveStep('openApiSpec'));
            dispatch(setNewApiContent(null));

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
      }
    });
  };

  const onBackHandler = () => {
    dispatch(setApiPublishModalActiveStep(orderedSteps[orderedSteps.indexOf(activeStep) - 1]));
    setErrorMessage('');
  };

  useEffect(() => {
    if (activeStep !== 'target' || !apiContent) {
      return;
    }

    if (!apiContent.openapi['x-kusk']?.upstream && apiContent.openapi['x-kusk']?.redirect) {
      setTargetSelection('redirect');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  useEffect(() => {
    if (!apiContent) {
      return;
    }

    const mocking = apiContent.openapi['x-kusk']?.mocking?.enabled;

    if (activeStepIndex > 2 && isPublishDisabled) {
      setIsPublishedDisabled(false);
    } else if ((activeStepIndex <= 1 && !mocking && !isPublishDisabled) || !activeStepIndex) {
      setIsPublishedDisabled(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiContent, activeStepIndex]);

  return (
    <S.Modal
      footer={
        <>
          {activeStep !== 'openApiSpec' ? (
            <Button type="text" onClick={onBackHandler}>
              Back
            </Button>
          ) : null}

          {activeStep !== 'websocket' ? (
            <Button type="default" onClick={() => onSubmitHandler()}>
              {renderedNextButtonText[activeStepIndex]}
            </Button>
          ) : null}

          <Button type="primary" disabled={isPublishDisabled || isPublishing} onClick={() => onSubmitHandler(true)}>
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
              {activeStep === 'openApiSpec' && (
                <OpenApiSpec form={form} isApiMocked={isApiMocked} setIsApiMocked={value => setIsApiMocked(value)} />
              )}
              {activeStep === 'apiInfo' && <ApiInfo form={form} />}
              {activeStep === 'fleetInfo' && <FleetInfo form={form} />}

              {activeStep === 'validation' && <Validation form={form} isApiMocked={isApiMocked} />}
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
                      form={form}
                      reference={upstreamReference}
                      setReference={reference => setUpstreamReference(reference)}
                    />
                  ) : (
                    <Redirect
                      form={form}
                      selectedTab={redirectTabSelection}
                      setSelectedTab={tabKey => setRedirectTabSelection(tabKey)}
                    />
                  )}
                </>
              )}
              {activeStep === 'hosts' && <Hosts form={form} />}
              {activeStep === 'qos' && <QOS form={form} />}
              {activeStep === 'path' && <Path form={form} />}
              {activeStep === 'cors' && <CORS form={form} />}
              {activeStep === 'websocket' && <Websocket form={form} />}
            </Suspense>
          </Form>
        </S.FormContainer>
      </S.Container>
    </S.Modal>
  );
};

const formatApiName = (name: string) =>
  name
    ? name
        .trim()
        .replace(/[\W_]+/g, '-')
        .toLowerCase()
    : '';

export default ApiPublishModal;
