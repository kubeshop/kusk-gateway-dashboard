import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';
import {StepNotApplicableTooltip} from '@constants/tooltips';

import {StepType} from '@models/ui';

import {useAppSelector} from '@redux/hooks';

import ExternalLinkIcon from '@components/Icons/ExternalLink';

import * as S from './StepTitle.styled';

interface IProps {
  step: StepType;
  title: string;
  documentationLink?: string;
  isStepApplicable?: boolean;
}

const StepTitle: React.FC<IProps> = props => {
  const {
    step,
    title,
    documentationLink = `https://kubeshop.github.io/kusk-gateway/extension/#${step}`,
    isStepApplicable = true,
  } = props;

  const activeStep = useAppSelector(state => state.ui.apiPublishModal.activeStep);

  return (
    <>
      <S.StepTitleContainer>
        {title}

        {!isStepApplicable && (
          <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={StepNotApplicableTooltip}>
            <S.ExclamationCircleOutlined />
          </Tooltip>
        )}
      </S.StepTitleContainer>

      {step !== 'apiInfo' && step === activeStep && (
        <S.LearnMoreContainer href={documentationLink} rel="noopener noreferrer" target="_blank">
          Learn more
          <ExternalLinkIcon height={15} width={15} />
        </S.LearnMoreContainer>
      )}
    </>
  );
};

export default StepTitle;
