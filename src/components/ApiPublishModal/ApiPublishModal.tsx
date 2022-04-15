import {Suspense, lazy, useEffect, useMemo, useState} from 'react';

import {Button, Form, Modal, Skeleton, Steps, Tabs} from 'antd';

import YAML from 'yaml';

import {ApiItem, useDeployApi} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setApis, setNewApiContent, updateNewApiOpenApiSpec} from '@redux/reducers/main';
import {closeApiPublishModal} from '@redux/reducers/ui';

import {ErrorLabel} from '@components/AntdCustom';

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
  const [redirectTabSelection, setRedirectTabSelection] = useState<string>('path_redirect');
  const [upstreamRedirectTabSelection, setUpstreamRedirectTabSelection] = useState<string>('upstream');
  const [upstreamReference, setUpstreamReference] = useState<string>('service');

  const {mutate: deployAPI} = useDeployApi({});

  const [form] = Form.useForm();

  const activeStepIndex = useMemo(() => orderedSteps.indexOf(activeStep), [activeStep]);

  const onCancelHandler = () => {
    dispatch(closeApiPublishModal());
  };

  const onDeployHandler = () => {
    if (!apiContent) {
      return;
    }

    form.validateFields().then(values => {
      const {websocket} = values;

      const deployedOpenApiSpec = JSON.parse(
        JSON.stringify({
          ...apiContent.openapi,
          'x-kusk': {...apiContent.openapi['x-kusk'], websocket},
        })
      );

      if (isApiMocked) {
        delete deployedOpenApiSpec['x-kusk'].validation;
      }

      cleanseObject(deployedOpenApiSpec['x-kusk']);
      dispatch(updateNewApiOpenApiSpec(deployedOpenApiSpec));

      const body = {
        name: apiContent.name,
        namespace: apiContent.namespace,
        openapi: YAML.stringify(deployedOpenApiSpec),
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
    });
  };

  const onNextHandler = () => {
    form.validateFields().then(values => {
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

        dispatch(setNewApiContent({name, namespace, openapi: parsedOpenApi}));

        if (mocking?.enabled) {
          setIsApiMocked(true);
        } else if (isApiMocked) {
          setIsApiMocked(false);
        }

        setActiveStep('apiInfo');
      }

      if (!apiContent?.openapi) {
        return;
      }

      if (activeStep === 'apiInfo') {
        const {name, namespace} = values;

        dispatch(setNewApiContent({name, namespace: namespace || 'default', openapi: apiContent.openapi}));

        setActiveStep('validation');
      }

      if (!apiContent) {
        return;
      }

      if (activeStep === 'validation') {
        const {validation} = values;

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], validation}};

        dispatch(updateNewApiOpenApiSpec(openApiSpec));
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

        dispatch(updateNewApiOpenApiSpec(openApiSpec));
      }

      if (activeStep === 'hosts') {
        const {hosts} = values;

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], hosts}};

        dispatch(updateNewApiOpenApiSpec(openApiSpec));
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

        dispatch(updateNewApiOpenApiSpec(openApiSpec));
      }

      if (activeStep === 'path') {
        const {path} = values;

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], path}};

        dispatch(updateNewApiOpenApiSpec(openApiSpec));
      }

      if (activeStep === 'cors') {
        const {cors} = values;

        if (cors['max_age']) {
          cors['max_age'] = parseInt(cors['max_age'], 10);
        }

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], cors}};

        dispatch(updateNewApiOpenApiSpec(openApiSpec));
      }

      setActiveStep(orderedSteps[orderedSteps.indexOf(activeStep) + 1]);
    });
  };

  const onBackHandler = () => {
    setActiveStep(orderedSteps[orderedSteps.indexOf(activeStep) - 1]);
    setErrorMessage('');
  };

  const onSubmitHandler = () => {
    if (activeStep === 'websocket') {
      onDeployHandler();
    } else {
      onNextHandler();
    }
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

  return (
    <Modal
      bodyStyle={{height: '600px'}}
      footer={
        <>
          {activeStep !== 'openApiSpec' ? <Button onClick={onBackHandler}>Back</Button> : null}

          <Button type="primary" onClick={onSubmitHandler}>
            {renderedNextButtonText[activeStepIndex]}
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
            <S.Step title="OpenAPI Spec" />
            <S.Step title="API Content" />
            <S.Step title="Validation" />
            <S.Step title="Upstream | Redirect" />
            <S.Step title="Hosts" />
            <S.Step title="QOS" />
            <S.Step title="Path" />
            <S.Step title="CORS" />
            <S.Step title="Websocket" />
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
              {activeStep === 'openApiSpec' && <OpenApiSpec form={form} />}
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

const cleanseObject = (obj: {[key: string]: any}) => {
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    let type = typeof value;

    if (type === 'object' && value) {
      cleanseObject(value);

      if (!Object.keys(value).length) {
        delete obj[key];
      }
    } else if (!value) {
      delete obj[key];
    }
  });
};

const formatApiName = (name: string) => name.replace(/\s/g, '-').toLowerCase();

export default ApiPublishModal;
