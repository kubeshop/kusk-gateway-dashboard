import {useMemo, useState} from 'react';

import {Button, Form, Radio, Steps} from 'antd';

import {StaticRouteForm} from '@models/main';
import {PathModalStepType} from '@models/ui';

import {FormStep} from '@components/FormStep';
import {FormStepLayout} from '@components/FormStepLayout';

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

const orderedSteps: Array<PathModalStepType> = ['path', 'target', 'qos', 'cors', 'websocket'];

const requiredSteps: Array<PathModalStepType> = ['path', 'target'];

const steps: Array<{step: PathModalStepType; title: string; documentationLink: string}> = [
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
  const [form] = Form.useForm<StaticRouteForm['paths']>();
  const [activeStep, setActiveStep] = useState<PathModalStepType>('path');
  const [lastVisitedStep, setLastVisitedStep] = useState<PathModalStepType>('path');
  const [targetSelection, setTargetSelection] = useState<'upstream' | 'redirect'>('upstream');
  const [upstreamReference, setUpstreamReference] = useState<string>('service');
  const [redirectTabSelection, setRedirectTabSelection] = useState<string>('path_redirect');
  const activeStepIndex = useMemo(() => orderedSteps.indexOf(activeStep), [activeStep]);
  const disableAddPathButton = useMemo(
    () => requiredSteps.includes(activeStep) && requiredSteps.indexOf(activeStep) < requiredSteps.length - 1,
    [activeStep]
  );

  const onSubmitHandler = async () => {
    await form.validateFields();
    form.submit();
    setAddPathModal(false);
  };

  const onBackHandler = () => {
    setAddPathModal(false);
  };

  const handleNextStep = async () => {
    const stepPath = activeStep === 'target' ? targetSelection : activeStep;
    const stepFields = form
      .getFieldsError()
      .map(el => el.name)
      .filter(el => el[0] === stepPath);
    await form.validateFields(stepFields);
    setActiveStep(orderedSteps[activeStepIndex + 1]);
    setLastVisitedStep(orderedSteps[activeStepIndex + 1]);
  };

  return (
    <S.Modal
      visible
      title="Publish Static Route - Add New Path"
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

          <Button type="primary" disabled={disableAddPathButton} onClick={onSubmitHandler}>
            Add Path
          </Button>
        </>
      }
    >
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical" current={activeStepIndex}>
            {steps.map(step => (
              <FormStep
                key={`${step.step.toString()}`}
                step={step.step}
                documentationLink={step.documentationLink}
                orderedSteps={orderedSteps}
                activeStep={activeStep}
                lastCompletedStep={lastVisitedStep}
                title={step.title}
                setActiveStep={setActiveStep}
              />
            ))}
          </Steps>
        </S.StepsContainer>
        <S.FormContainer>
          <Form layout="vertical" form={form} name="addPathForm">
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
