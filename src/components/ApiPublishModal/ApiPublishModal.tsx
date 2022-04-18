import {Suspense, lazy, useEffect, useMemo, useState} from 'react';

import {Button, Form, Modal, Skeleton, Steps, Tabs} from 'antd';

import cleanDeep from 'clean-deep';
import YAML from 'yaml';

import {ApiItem, useDeployApi} from '@models/api';
import {ApiContent} from '@models/main';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setApis, setNewApiContent} from '@redux/reducers/main';
import {closeApiPublishModal} from '@redux/reducers/ui';

import {ErrorLabel} from '@components/AntdCustom';

import StepTitle from './StepTitle';

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

const {TabPane} = Tabs;

const renderedNextButtonText: {[key: number]: string} = {
  0: 'Add API Info',
  1: 'Add Validation ',
  2: 'Add Upstream | Redirect',
  3: 'Add Hosts',
  4: 'Add QOS',
  5: 'Add Path',
  6: 'Add CORS',
  7: 'Add Websocket',
  8: 'Publish',
};

const orderedSteps = [
  'openApiSpec',
  'apiInfo',
  'validation',
  'upstreamOrRedirect',
  'hosts',
  'qos',
  'path',
  'cors',
  'websocket',
] as const;
type StepType = typeof orderedSteps[number];

const ApiPublishModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const apiContent = useAppSelector(state => state.main.newApiContent);
  const apis = useAppSelector(state => state.main.apis);

  const [activeStep, setActiveStep] = useState<StepType>('openApiSpec');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isApiMocked, setIsApiMocked] = useState<boolean>(false);
  const [isPublishDisabled, setIsPublishedDisabled] = useState<boolean>(true);
  const [redirectTabSelection, setRedirectTabSelection] = useState<string>('path_redirect');
  const [upstreamRedirectTabSelection, setUpstreamRedirectTabSelection] = useState<string>('upstream');
  const [upstreamReference, setUpstreamReference] = useState<string>('service');

  const {mutate: deployAPI} = useDeployApi({});

  const [form] = Form.useForm();

  const activeStepIndex = useMemo(() => orderedSteps.indexOf(activeStep), [activeStep]);

  const onCancelHandler = () => {
    dispatch(closeApiPublishModal());
  };

  const onSubmitHandler = (deploy?: boolean) => {
    form.validateFields().then(values => {
      let newApiContent: ApiContent | null = null;

      if (activeStep === 'openApiSpec') {
        const {openapi, mocking} = values;

        let parsedOpenApi = YAML.parse(JSON.parse(JSON.stringify(openapi)));
        parsedOpenApi = {...parsedOpenApi, 'x-kusk': {...parsedOpenApi['x-kusk'], mocking}};

        let name = apiContent?.name || formatApiName(parsedOpenApi.info.title) || '';
        let namespace = apiContent?.namespace || '';

        if (mocking?.enabled) {
          if (!apiContent) {
            namespace = 'kusk';
          }

          if (!name.startsWith('mock-')) {
            name = `mock-${name}`;
          }
        } else if (!mocking?.enabled && name.startsWith('mock-')) {
          namespace = '';

          if (name.startsWith('mock-')) {
            name = name.replace('mock-', '');
          }
        }

        newApiContent = {name, namespace, openapi: parsedOpenApi};
      }

      if (apiContent) {
        if (activeStep === 'apiInfo') {
          const {name, namespace} = values;

          newApiContent = {name, namespace: namespace || 'default', openapi: apiContent.openapi};
        }

        if (activeStep === 'validation') {
          const {validation} = values;

          let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], validation}};
          newApiContent = {...apiContent, openapi: openApiSpec};
        }

        if (activeStep === 'upstreamOrRedirect') {
          const {redirect, upstream} = values;

          let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk']}};

          if (upstreamRedirectTabSelection === 'redirect') {
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

      if (!deploy && activeStep !== 'websocket') {
        dispatch(setNewApiContent(newApiContent));
        setActiveStep(orderedSteps[orderedSteps.indexOf(activeStep) + 1]);
      }

      if (deploy && newApiContent) {
        if (isApiMocked) {
          delete newApiContent.openapi['x-kusk'].validation;
        }

        const body = {
          name: newApiContent.name,
          namespace: newApiContent.namespace,
          openapi: YAML.stringify(cleanDeep(newApiContent.openapi)),
        };

        deployAPI(body)
          .then((response: any) => {
            const apiData: ApiItem = response;

            dispatch(setApis([...apis, apiData]));
            dispatch(closeApiPublishModal());
            dispatch(setNewApiContent(null));
          })
          .catch(err => {
            setErrorMessage(err.data);
          });
      }
    });
  };

  const onBackHandler = () => {
    setActiveStep(orderedSteps[orderedSteps.indexOf(activeStep) - 1]);
    setErrorMessage('');
  };

  useEffect(() => {
    if (activeStep !== 'upstreamOrRedirect' || !apiContent) {
      return;
    }

    if (!apiContent.openapi['x-kusk']?.upstream && apiContent.openapi['x-kusk']?.redirect) {
      setUpstreamRedirectTabSelection('redirect');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  useEffect(() => {
    if (!apiContent) {
      return;
    }

    const mocking = apiContent.openapi['x-kusk']?.mocking?.enabled;

    if ((mocking || activeStepIndex > 2) && isPublishDisabled) {
      setIsPublishedDisabled(false);
    } else if ((activeStepIndex <= 2 && !mocking && !isPublishDisabled) || !activeStepIndex) {
      setIsPublishedDisabled(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiContent, activeStepIndex]);

  return (
    <Modal
      bodyStyle={{height: '600px'}}
      footer={
        <>
          {activeStep !== 'openApiSpec' ? <Button onClick={onBackHandler}>Back</Button> : null}

          {activeStep !== 'websocket' ? (
            <Button type="primary" onClick={() => onSubmitHandler()}>
              {renderedNextButtonText[activeStepIndex]}
            </Button>
          ) : null}

          <Button type="primary" disabled={isPublishDisabled} onClick={() => onSubmitHandler(true)}>
            Publish
          </Button>
        </>
      }
      title="Publish New API"
      visible
      width="900px"
      onCancel={onCancelHandler}
    >
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical" current={activeStepIndex}>
            <S.Step title={<StepTitle title="OpenAPI Spec" />} />
            <S.Step title={<StepTitle title="API Info" />} />
            <S.Step title={<StepTitle title="Validation" isStepApplicable={!isApiMocked} />} />
            <S.Step title={<StepTitle title="Upstream | Redirect" isStepApplicable={!isApiMocked} />} />
            <S.Step title={<StepTitle title="Hosts" />} />
            <S.Step title={<StepTitle title="QOS" isStepApplicable={!isApiMocked} />} />
            <S.Step title={<StepTitle title="Path" />} />
            <S.Step title={<StepTitle title="CORS" />} />
            <S.Step title={<StepTitle title="Websocket" isStepApplicable={!isApiMocked} />} />
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
                <OpenApiSpec form={form} setIsApiMocked={value => setIsApiMocked(value)} />
              )}
              {activeStep === 'apiInfo' && <ApiInfo form={form} />}
              {activeStep === 'validation' && <Validation form={form} isApiMocked={isApiMocked} />}
              {activeStep === 'upstreamOrRedirect' && (
                <Tabs activeKey={upstreamRedirectTabSelection} onChange={key => setUpstreamRedirectTabSelection(key)}>
                  <TabPane tab="Upstream" key="upstream">
                    {upstreamRedirectTabSelection === 'upstream' && (
                      <Upstream
                        form={form}
                        isApiMocked={isApiMocked}
                        reference={upstreamReference}
                        setReference={reference => setUpstreamReference(reference)}
                      />
                    )}
                  </TabPane>

                  <TabPane tab="Redirect" key="redirect">
                    {upstreamRedirectTabSelection === 'redirect' && (
                      <Redirect
                        form={form}
                        selectedTab={redirectTabSelection}
                        setSelectedTab={tabKey => setRedirectTabSelection(tabKey)}
                      />
                    )}
                  </TabPane>
                </Tabs>
              )}
              {activeStep === 'hosts' && <Hosts form={form} />}
              {activeStep === 'qos' && <QOS form={form} />}
              {activeStep === 'path' && <Path form={form} />}
              {activeStep === 'cors' && <CORS form={form} />}
              {activeStep === 'websocket' && <Websocket form={form} />}
            </Suspense>
          </Form>

          {errorMessage && <ErrorLabel>*{errorMessage}</ErrorLabel>}
        </S.FormContainer>
      </S.Container>
    </Modal>
  );
};

const formatApiName = (name: string) => name.replace(/\s/g, '-').toLowerCase();

export default ApiPublishModal;
