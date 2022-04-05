import {useState} from 'react';

import {Form, Modal, Steps} from 'antd';

import YAML from 'yaml';

import {useAppDispatch} from '@redux/hooks';
import {closeApiDeployModal} from '@redux/reducers/ui';

import * as S from './styled';

const ApiDeployModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [apiContent, setApiContent] = useState<{[key: string]: any}>();

  const [form] = Form.useForm();

  const onCancelHandler = () => {
    if (activeStep) {
      setActiveStep(0);
    } else {
      dispatch(closeApiDeployModal());
    }
  };

  const onOkHandler = () => {
    if (activeStep) {
      form.validateFields().then(values => {
        console.log(apiContent);
        console.log(values);
      });

      //   const apiContent = YAML.parse(JSON.parse(JSON.stringify(values.content)));

      //   console.log(apiContent);
    } else {
      form.validateFields().then(values => {
        setApiContent(YAML.parse(JSON.parse(JSON.stringify(values.content))));
        setActiveStep(1);
      });
    }
  };

  return (
    <Modal
      cancelText={activeStep ? 'Back' : 'Cancel'}
      title="Deploy New API"
      visible
      width="800px"
      onCancel={onCancelHandler}
      okText={activeStep ? 'Deploy' : 'Next'}
      onOk={onOkHandler}
    >
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical" current={activeStep}>
            <S.Step title="API Content" />
            <S.Step title="Upstream Service" />
          </Steps>
        </S.StepsContainer>

        <Form form={form} layout="vertical">
          {activeStep === 0 ? (
            <Form.Item
              name="content"
              rules={[
                {
                  required: true,
                  message: 'Please enter your API content!',
                },
                () => {
                  return {
                    validator(_, value) {
                      if (typeof YAML.parse(JSON.parse(JSON.stringify(value))) === 'object') {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error('Please enter a valid API content!'));
                    },
                  };
                },
              ]}
            >
              <S.Textarea rows={20} placeholder="Enter API content in YAML/JSON format" />
            </Form.Item>
          ) : (
            <>
              <Form.Item
                label="Name"
                name={['upstream', 'service', 'name']}
                rules={[{required: true, message: 'Please enter a name!'}]}
              >
                <S.Input />
              </Form.Item>

              <Form.Item
                label="Namespace"
                name={['upstream', 'service', 'namespace']}
                rules={[{required: true, message: 'Please enter a namespace!'}]}
              >
                <S.Input />
              </Form.Item>

              <Form.Item
                label="Port"
                name={['upstream', 'service', 'port']}
                rules={[{required: true, message: 'Please enter a valid port!'}]}
              >
                <S.Input type="number" />
              </Form.Item>
            </>
          )}
        </Form>
      </S.Container>
    </Modal>
  );
};

export default ApiDeployModal;
