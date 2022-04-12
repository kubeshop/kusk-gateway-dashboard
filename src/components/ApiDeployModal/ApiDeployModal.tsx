import {useState} from 'react';

import {Button, Form, Modal, Steps} from 'antd';

import YAML from 'yaml';

import {useAppDispatch} from '@redux/hooks';
// import {setApis} from '@redux/reducers/main';
import {closeApiDeployModal} from '@redux/reducers/ui';

import {ErrorLabel} from '@components/AntdCustom';

import ApiContent from './ApiContent';
import Hosts from './Hosts';
import Upstream from './Upstream';

import * as S from './styled';

const ApiDeployModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [apiContent, setApiContent] = useState<{name: string; namespace: string; openapi: {[key: string]: any}}>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [upstreamReference, setUpstreamReference] = useState<string>('service');

  // const {mutate: deployAPI} = useDeployApi({});

  const [form] = Form.useForm();

  const onCancelHandler = () => {
    dispatch(closeApiDeployModal());
  };

  const onDeployHandler = () => {
    if (!apiContent) {
      return;
    }

    form.validateFields().then(values => {
      const deployedOpenApiSpec = {
        ...apiContent.openapi,
        'x-kusk': {...apiContent.openapi['x-kusk'], upstream: {...values.upstream}},
      };

      const body = {
        name: apiContent.name,
        namespace: apiContent.namespace,
        openapi: YAML.stringify(deployedOpenApiSpec),
      };

      console.log(values);
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

      // upstream extension
      if (activeStep === 1) {
        const {upstream} = values;
        const {pattern, substitution} = upstream['rewrite']['rewrite_regex'];

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], upstream}};

        if (upstreamReference === 'service') {
          delete openApiSpec['x-kusk'].upstream.host;
        } else {
          delete openApiSpec['x-kusk'].upstream.service;
        }

        if (!pattern && !substitution) {
          delete openApiSpec['x-kusk'].upstream.rewrite;
        }

        setApiContent({...apiContent, openapi: openApiSpec});
      }

      // hosts extension
      if (activeStep === 2) {
        const {hosts} = values;

        let openApiSpec = {...apiContent.openapi, 'x-kusk': {...apiContent.openapi['x-kusk'], hosts}};

        if (!hosts.length) {
          delete openApiSpec['x-kusk'].hosts;
        }

        setApiContent({
          ...apiContent,
          openapi: openApiSpec,
        });
      }

      setActiveStep(activeStep + 1);
    });
  };

  console.log(apiContent);

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
              if (activeStep === 5) {
                onDeployHandler();
              } else {
                onNextHandler();
              }
            }}
          >
            {activeStep === 5 ? 'Deploy' : 'Next'}
          </Button>
        </>
      }
      title="Deploy New API"
      visible
      width="800px"
      onCancel={onCancelHandler}
    >
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical" current={activeStep}>
            <S.Step title="API Content" />
            <S.Step title="Upstream" />
            <S.Step title="Hosts" />
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
                <Upstream
                  form={form}
                  openApiSpec={apiContent.openapi}
                  reference={upstreamReference}
                  setReference={reference => setUpstreamReference(reference)}
                />
              ) : (
                <Hosts form={form} openApiSpec={apiContent.openapi} />
              )
            ) : null}
          </Form>

          {errorMessage && <ErrorLabel>*{errorMessage}</ErrorLabel>}
        </div>
      </S.Container>
    </Modal>
  );
};

// const assignNestedProperty = (obj: {[key: string]: any}, keyPath: string[], value: string | number | boolean) => {
//   const lastKeyIndex = keyPath.length - 1;
//   for (let i = 0; i < lastKeyIndex; i += 1) {
//     const key = keyPath[i];
//     if (!(key in obj)) {
//       obj[key] = {};
//     }
//     obj = obj[key];
//   }
//   obj[keyPath[lastKeyIndex]] = value;
// };

export default ApiDeployModal;
