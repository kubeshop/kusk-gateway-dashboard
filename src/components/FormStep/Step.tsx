import {useMemo} from 'react';

import * as S from './Step.styled';
import StepTitle from './StepTitle';

interface IProps<T> {
  orderedSteps: T[];
  step: T;
  title: string;
  documentationLink?: string;
  activeStep: T;
  lastCompletedStep: T;
  setActiveStep: (step: T) => void;
}

const Step = <T extends string>(props: IProps<T>): JSX.Element => {
  const {
    orderedSteps,
    step,
    title,
    activeStep,
    lastCompletedStep,
    setActiveStep,
    documentationLink = `https://kubeshop.github.io/kusk-gateway/reference/extension/#${step}`,
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
      title={<StepTitle documentationLink={documentationLink} title={title} />}
      onClick={onClickHandler}
    />
  );
};

export default Step;
