import {useMemo} from 'react';

import {StepType} from '@models/ui';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setApiPublishModalActiveStep} from '@redux/reducers/ui';

import * as S from './Step.styled';
import StepTitle from './StepTitle';

interface IProps {
  isApiMocked: boolean;
  orderedSteps: StepType[];
  step: StepType;
  title: string;
  documentationLink?: string;
}

const Step: React.FC<IProps> = props => {
  const {
    isApiMocked,
    orderedSteps,
    step,
    title,
    documentationLink = `https://kubeshop.github.io/kusk-gateway/reference/extension/#${step}`,
    ...rest
  } = props;

  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(state => state.ui.apiPublishModal.activeStep);
  const lastCompletedStep = useAppSelector(state => state.ui.apiPublishModal.lastCompletedStep);

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
    if (activeStep !== step && orderedSteps.indexOf(step) <= orderedSteps.indexOf(lastCompletedStep)) {
      dispatch(setApiPublishModalActiveStep(step));
    }
  };

  return (
    <S.Step
      {...rest}
      $completed={isStepCompleted}
      status={stepStatus}
      title={
        <StepTitle documentationLink={documentationLink} step={step} title={title} isStepApplicable={!isApiMocked} />
      }
      onClick={onClickHandler}
    />
  );
};

export default Step;
