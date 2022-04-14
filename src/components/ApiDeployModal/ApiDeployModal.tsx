import {useEffect, useMemo, useState} from 'react';

import {Button, Form, Modal, Steps, Tabs} from 'antd';

import YAML from 'yaml';

import {ApiItem, useDeployApi} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setApis, setNewApiContent, updateNewApiOpenApiSpec} from '@redux/reducers/main';
import {closeApiDeployModal} from '@redux/reducers/ui';

import {ErrorLabel} from '@components/AntdCustom';

import ApiContent from './ApiContent';
import CORS from './extensions/CORS';
import Hosts from './extensions/Hosts';
import Path from './extensions/Path';
import QOS from './extensions/QOS';
import Redirect from './extensions/Redirect';
import Upstream from './extensions/Upstream';
import Validation from './extensions/Validation';
import Websocket from './extensions/Websocket';

import * as S from './styled';

const {TabPane} = Tabs;

const ApiDeployModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const apiContent = useAppSelector(state => state.main.newApiContent);
  const apis = useAppSelector(state => state.main.apis);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [redirectTabSelection, setRedirectTabSelection] = useState<string>('path_redirect');
  const [upstreamRedirectTabSelection, setUpstreamRedirectTabSelection] = useState<string>('upstream');
  const [upstreamReference, setUpstreamReference] = useState<string>('service');

  const {mutate: deployAPI} = useDeployApi({});

  const [form] = Form.useForm();

  const renderedNextButtonText: {[key: number]: string} = useMemo(
    () => ({
      0: 'Add Validation ',
      1: 'Add Upstream | Redirect',
      2: 'Add Hosts',
      3: 'Add QOS',
      4: 'Add Path',
      5: 'Add CORS',
      6: 'Add Websocket',
      7: 'Deploy',
    }),
    []
  );

  const onCancelHandler = () => {
    dispatch(closeApiDeployModal());
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

      cleanseObject(deployedOpenApiSpec);
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
          dispatch(closeApiDeployModal());
          dispatch(setNewApiContent(null));
        })
        .catch(err => {
          setErrorMessage(err.data);
        });
    });
  };

  const onNextHandler = () => {
    form.validateFields().then(values => {
      // api content
      if (!activeStep) {
        const {name, namespace, openapi} = values;

        dispatch(
          setNewApiContent({
            name,
            namespace: namespace || 'default',
            openapi: YAML.parse(JSON.parse(JSON.stringify(openapi))),
          })
        );

        setActiveStep(activeStep + 1);
      }

      if (!apiContent) {
        return;
      }

      // validation
      if (activeStep === 1) {
        const {validation} = values;

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], validation}};

        dispatch(updateNewApiOpenApiSpec(openApiSpec));
      }

      // upstream and redirect extension
      if (activeStep === 2) {
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

      // hosts extension
      if (activeStep === 3) {
        const {hosts} = values;

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], hosts}};

        dispatch(updateNewApiOpenApiSpec(openApiSpec));
      }

      // qos extension
      if (activeStep === 4) {
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

      // path extension
      if (activeStep === 5) {
        const {path} = values;

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], path}};

        dispatch(updateNewApiOpenApiSpec(openApiSpec));
      }

      // cors extension
      if (activeStep === 6) {
        const {cors} = values;

        if (cors['max_age']) {
          cors['max_age'] = parseInt(cors['max_age'], 10);
        }

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], cors}};

        dispatch(updateNewApiOpenApiSpec(openApiSpec));
      }

      setActiveStep(activeStep + 1);
    });
  };

  const onBackHandler = () => {
    setActiveStep(activeStep - 1);
    setErrorMessage('');
  };

  useEffect(() => {
    if (activeStep !== 2 || !apiContent) {
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
          {activeStep ? <Button onClick={onBackHandler}>Back</Button> : null}

          <Button
            type="primary"
            onClick={() => {
              if (activeStep === 7) {
                onDeployHandler();
              } else {
                onNextHandler();
              }
            }}
          >
            {renderedNextButtonText[activeStep]}
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
          <Steps direction="vertical" current={activeStep}>
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
            {activeStep === 0 ? (
              <ApiContent apiContent={apiContent} form={form} />
            ) : apiContent ? (
              activeStep === 1 ? (
                <Validation form={form} openApiSpec={apiContent.openapi} />
              ) : activeStep === 2 ? (
                <Tabs activeKey={upstreamRedirectTabSelection} onChange={key => setUpstreamRedirectTabSelection(key)}>
                  <TabPane tab="Upstream" key="upstream">
                    {upstreamRedirectTabSelection === 'upstream' && (
                      <Upstream
                        form={form}
                        openApiSpec={apiContent.openapi}
                        reference={upstreamReference}
                        setReference={reference => setUpstreamReference(reference)}
                      />
                    )}
                  </TabPane>

                  <TabPane tab="Redirect" key="redirect">
                    {upstreamRedirectTabSelection === 'redirect' && (
                      <Redirect
                        form={form}
                        openApiSpec={apiContent.openapi}
                        selectedTab={redirectTabSelection}
                        setSelectedTab={tabKey => setRedirectTabSelection(tabKey)}
                      />
                    )}
                  </TabPane>
                </Tabs>
              ) : activeStep === 3 ? (
                <Hosts form={form} openApiSpec={apiContent.openapi} />
              ) : activeStep === 4 ? (
                <QOS form={form} openApiSpec={apiContent.openapi} />
              ) : activeStep === 5 ? (
                <Path form={form} openApiSpec={apiContent.openapi} />
              ) : activeStep === 6 ? (
                <CORS form={form} openApiSpec={apiContent.openapi} />
              ) : (
                <Websocket form={form} openApiSpec={apiContent.openapi} />
              )
            ) : null}
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

    if (type === 'object') {
      cleanseObject(value);

      if (!Object.keys(value).length) {
        delete obj[key];
      }
    } else if (type === 'undefined') {
      delete obj[key];
    }
  });
};

export default ApiDeployModal;
