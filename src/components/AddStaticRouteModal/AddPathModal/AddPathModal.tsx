import {useMemo, useState} from 'react';

import {Button, Form, Radio, Steps} from 'antd';

import {FormStepLayout} from '@components/FormStepLayout';

import Step from './Step';
import CORS from './extension/CORS';
import Path from './extension/Path';
import QOS from './extension/QOS';
import Redirect from './extension/Redirect';
import Upstream from './extension/Upstream';
import Websocket from './extension/Websocket';

import * as S from './styled';

interface IProps {
  setAddPathModal: (open: boolean) => void;
}

type PathModalSteps = 'path' | 'target' | 'qos' | 'cors' | 'websocket';

const orderedSteps: Array<PathModalSteps> = ['path', 'target', 'qos', 'cors', 'websocket'];

const steps = [
  {step: 'path', title: 'Path Info', documentationLink: ''},
  {
    step: 'target',
    title: 'Target',
    documentationLink: '',
  },
  {
    step: 'qos',
    title: 'QOS',
    documentationLink: '',
  },
  {
    step: 'cors',
    title: 'CORS',
    documentationLink: '',
  },
  {
    step: 'websocket',
    title: 'Websocket',
    documentationLink: '',
  },
];

const renderedNextButtonText: {[key: number]: string} = {
  0: 'Add Path Name',
  1: 'Add Target',
  2: 'Add QOS',
  3: 'Add CORS',
  4: 'Add Websocket',
  5: 'Publish',
};

const AddPathModal = ({setAddPathModal}: IProps): JSX.Element => {
  const [form] = Form.useForm();
  const [activeStep, setActiveStep] = useState<PathModalSteps>('path');
  const [lastVisitedStep, setLastVisitedStep] = useState<PathModalSteps>('path');
  const [targetSelection, setTargetSelection] = useState<'upstream' | 'redirect'>('upstream');
  const [upstreamReference, setUpstreamReference] = useState<string>('service');
  const [redirectTabSelection, setRedirectTabSelection] = useState<string>('path_redirect');
  const activeStepIndex = useMemo(() => orderedSteps.indexOf(activeStep), [activeStep]);

  const onSubmitHandler = () => {};

  const onBackHandler = () => {
    setAddPathModal(false);
  };

  const handleNextStep = async () => {
    try {
      await form.validateFields();
      setActiveStep(orderedSteps[activeStepIndex + 1]);
      setLastVisitedStep(orderedSteps[activeStepIndex + 1]);
    } catch (formError: any) {
      // check required step error
      const stepPath = activeStep === 'target' ? targetSelection : activeStep;
      if (!formError.errorFields.find((el: any) => el.name[0] === stepPath)) {
        setActiveStep(orderedSteps[activeStepIndex + 1]);
        setLastVisitedStep(orderedSteps[activeStepIndex + 1]);
      }
    }
  };

  return (
    <S.Modal
      visible
      title="Add New Path"
      width="900px"
      onCancel={onBackHandler}
      footer={
        <>
          <Button type="text" onClick={onBackHandler}>
            Cancel
          </Button>

          {activeStep !== 'websocket' ? (
            <Button type="default" onClick={handleNextStep}>
              {renderedNextButtonText[activeStepIndex + 1]}
            </Button>
          ) : null}

          <Button type="primary" onClick={onSubmitHandler}>
            Add Path
          </Button>
        </>
      }
    >
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical">
            {steps.map(step => (
              <Step
                key={step.step}
                documentationLink={step.documentationLink}
                orderedSteps={orderedSteps}
                activeStep={activeStep}
                lastCompletedStep={lastVisitedStep}
                step={step.step}
                title={step.title}
                setActiveStep={setActiveStep}
              />
            ))}
          </Steps>
        </S.StepsContainer>
        <S.FormContainer>
          <Form layout="vertical" form={form}>
            <FormStepLayout visible={activeStep === 'path'}>
              <Path />
            </FormStepLayout>

            <FormStepLayout visible={activeStep === 'target'}>
              <S.RadioGroupContainer>
                <S.Label>Target</S.Label>
                <Radio.Group name="target" value={targetSelection} onChange={e => setTargetSelection(e.target.value)}>
                  <Radio value="upstream">Upstream</Radio>
                  <Radio value="redirect">Redirect</Radio>
                </Radio.Group>
              </S.RadioGroupContainer>

              {targetSelection === 'upstream' ? (
                <Upstream reference={upstreamReference} setReference={reference => setUpstreamReference(reference)} />
              ) : (
                <Redirect
                  selectedTab={redirectTabSelection}
                  setSelectedTab={tabKey => setRedirectTabSelection(tabKey)}
                />
              )}
            </FormStepLayout>

            <FormStepLayout visible={activeStep === 'qos'}>
              <QOS />
            </FormStepLayout>

            <FormStepLayout visible={activeStep === 'cors'}>
              <CORS />
            </FormStepLayout>

            <FormStepLayout visible={activeStep === 'websocket'}>
              <Websocket />
            </FormStepLayout>
          </Form>
        </S.FormContainer>
      </S.Container>
    </S.Modal>
  );
};

export default AddPathModal;
