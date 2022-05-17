import {Dispatch, useMemo} from 'react';

import * as S from './Step.styled';
import StepTitle from './StepTitle';

interface IProps {
  orderedSteps: string[];
  step: string;
  title: string;
  activeStep: string;
  lastCompletedStep: string;
  documentationLink?: string;
  setActiveStep: Dispatch<any>;
}

const Step: React.FC<IProps> = props => {
  const {
    orderedSteps,
    step,
    activeStep,
    lastCompletedStep,
    title,
    documentationLink = `https://kubeshop.github.io/kusk-gateway/reference/extension/#${step}`,
    setActiveStep,
    ...rest
  } = props;

  const isStepCompleted = useMemo(
    () => activeStep !== step && orderedSteps.indexOf(step) <= orderedSteps.indexOf(lastCompletedStep),
    [activeStep, lastCompletedStep, orderedSteps, step]
  );

  const stepStatus = useMemo(
    () =>
      activeStep === step
        ? 'process'
        : orderedSteps.indexOf(lastCompletedStep) < orderedSteps.indexOf(step)
        ? 'wait'
        : 'finish',
    [activeStep, lastCompletedStep, orderedSteps, step]
  );

  const onClickHandler = () => {
    if (isStepCompleted || activeStep === step) {
      setActiveStep(step);
    }
  };

  return (
    <S.Step
      {...rest}
      $completed={isStepCompleted}
      status={stepStatus}
      title={
        <StepTitle documentationLink={documentationLink} step={step} title={title}  />
      }
      onClick={onClickHandler}
    />
  );
};

export default Step;
