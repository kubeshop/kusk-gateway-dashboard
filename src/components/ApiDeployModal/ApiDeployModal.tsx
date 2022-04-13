import {useMemo, useState} from 'react';

import {Button, Form, Modal, Steps} from 'antd';

import YAML from 'yaml';

import {useAppDispatch} from '@redux/hooks';
// import {setApis} from '@redux/reducers/main';
import {closeApiDeployModal} from '@redux/reducers/ui';

import {ErrorLabel} from '@components/AntdCustom';

import ApiContent from './ApiContent';
import CORS from './CORS';
import Hosts from './Hosts';
import Path from './Path';
import QOS from './QOS';
import Redirect from './Redirect';
import Upstream from './Upstream';
import ValidationAndWebsocket from './ValidationAndWebsocket';

import * as S from './styled';

const ApiDeployModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [apiContent, setApiContent] = useState<{name: string; namespace: string; openapi: {[key: string]: any}}>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [redirectTabSelection, setRedirectTabSelection] = useState<string>('path_redirect');
  const [upstreamReference, setUpstreamReference] = useState<string>('service');

  // const {mutate: deployAPI} = useDeployApi({});

  const [form] = Form.useForm();

  const renderedNextButtonText: {[key: number]: string} = useMemo(
    () => ({
      0: 'Add Validation & Websocket',
      1: 'Add Upstream',
      2: 'Add Hosts',
      3: 'Add Redirect',
      4: 'Add QOS',
      5: 'Add Path',
      6: 'Add CORS',
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
      const {cors} = values;

      if (cors['max_age']) {
        cors['max_age'] = parseInt(cors['max_age'], 10);
      }

      const deployedOpenApiSpec = {
        ...apiContent.openapi,
        'x-kusk': {...apiContent.openapi['x-kusk'], cors},
      };

      cleanseObject(deployedOpenApiSpec);

      const body = {
        name: apiContent.name,
        namespace: apiContent.namespace,
        openapi: YAML.stringify(deployedOpenApiSpec),
      };

      console.log(deployedOpenApiSpec);
      console.log(body);

      // deployAPI(body)
      //   .then((response: any) => {
      //     const apiData: ApiItem = response;

      //     dispatch(setApis([...apis, apiData]));
      //     dispatch(closeApiDeployModal());
      //   })
      //   .catch(err => {
      //     setErrorMessage(err.data);
      //   });
    });
  };

  const onNextHandler = () => {
    form.validateFields().then(values => {
      // api content
      if (!activeStep) {
        const {name, namespace, openapi} = values;

        setApiContent({
          name,
          namespace: namespace || 'default',
          openapi: YAML.parse(JSON.parse(JSON.stringify(openapi))),
        });

        setActiveStep(activeStep + 1);
      }

      if (!apiContent) {
        return;
      }

      // validation & websocket extension
      if (activeStep === 1) {
        const {validation, websocket} = values;

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], validation, websocket}};

        setApiContent({...apiContent, openapi: openApiSpec});
      }

      // upstream extension
      if (activeStep === 2) {
        const {upstream} = values;

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], upstream}};

        if (upstreamReference === 'service') {
          delete openApiSpec['x-kusk'].upstream.host;
          openApiSpec['x-kusk'].upstream.service.port = parseInt(upstream.service.port, 10);
        } else {
          delete openApiSpec['x-kusk'].upstream.service;
          openApiSpec['x-kusk'].upstream.host.port = parseInt(upstream.host.port, 10);
        }

        setApiContent({...apiContent, openapi: openApiSpec});
      }

      // hosts extension
      if (activeStep === 3) {
        const {hosts} = values;

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], hosts}};

        setApiContent({...apiContent, openapi: openApiSpec});
      }

      // redirect extension
      if (activeStep === 4) {
        const {redirect} = values;

        if (redirect['port_redirect']) {
          redirect['port_redirect'] = parseInt(redirect['port_redirect'], 10);
        }

        if (redirect['response_code']) {
          redirect['response_code'] = parseInt(redirect['response_code'], 10);
        }

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], redirect}};

        if (redirectTabSelection === 'path_redirect') {
          delete openApiSpec['x-kusk'].redirect['rewrite_regex'];
        } else {
          delete openApiSpec['x-kusk'].redirect['path_redirect'];
        }

        setApiContent({...apiContent, openapi: openApiSpec});
      }

      // qos extension
      if (activeStep === 5) {
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

        setApiContent({...apiContent, openapi: openApiSpec});
      }

      // path extension
      if (activeStep === 6) {
        const {path} = values;

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], path}};

        setApiContent({...apiContent, openapi: openApiSpec});
      }

      setActiveStep(activeStep + 1);
    });
  };

  const onBackHandler = () => {
    setActiveStep(activeStep - 1);
    setErrorMessage('');
  };

  return (
    <Modal
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
      title="Deploy New API"
      visible
      width="900px"
      onCancel={onCancelHandler}
    >
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical" current={activeStep}>
            <S.Step title="API Content" />
            <S.Step title="Validation & Websocket" />
            <S.Step title="Upstream" />
            <S.Step title="Hosts" />
            <S.Step title="Redirect" />
            <S.Step title="QOS" />
            <S.Step title="Path" />
            <S.Step title="CORS" />
          </Steps>
        </S.StepsContainer>

        <div>
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
                <ValidationAndWebsocket form={form} openApiSpec={apiContent.openapi} />
              ) : activeStep === 2 ? (
                <Upstream
                  form={form}
                  openApiSpec={apiContent.openapi}
                  reference={upstreamReference}
                  setReference={reference => setUpstreamReference(reference)}
                />
              ) : activeStep === 3 ? (
                <Hosts form={form} openApiSpec={apiContent.openapi} />
              ) : activeStep === 4 ? (
                <Redirect
                  form={form}
                  openApiSpec={apiContent.openapi}
                  selectedTab={redirectTabSelection}
                  setSelectedTab={tabKey => setRedirectTabSelection(tabKey)}
                />
              ) : activeStep === 5 ? (
                <QOS form={form} openApiSpec={apiContent.openapi} />
              ) : activeStep === 6 ? (
                <Path form={form} openApiSpec={apiContent.openapi} />
              ) : (
                <CORS form={form} openApiSpec={apiContent.openapi} />
              )
            ) : null}
          </Form>

          {errorMessage && <ErrorLabel>*{errorMessage}</ErrorLabel>}
        </div>
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
