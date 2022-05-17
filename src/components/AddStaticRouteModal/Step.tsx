import {useMemo} from 'react';

import { useAppSelector} from '@redux/hooks';

import * as S from './Step.styled';
import StepTitle from './StepTitle';

interface IProps {
  orderedSteps: string[];
  step: string;
  title: string;
  documentationLink?: string;
}

const Step: React.FC<IProps> = props => {
  const {
    orderedSteps,
    step,
    title,
    documentationLink = `https://kubeshop.github.io/kusk-gateway/reference/extension/#${step}`,
    ...rest
  } = props;

  const activeStep = useAppSelector(state => state.ui.staticRouteModal.activeStep);
  const lastCompletedStep = useAppSelector(state => state.ui.staticRouteModal.lastCompletedStep);

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
