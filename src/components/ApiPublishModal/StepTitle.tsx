import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';
import {StepNotApplicableTooltip} from '@constants/tooltips';

import ExternalLinkIcon from '@components/Icons/ExternalLink';

import * as S from './StepTitle.styled';

interface IProps {
  title: string;
  documentationLink?: string;
  isStepActive?: boolean;
  isStepApplicable?: boolean;
}

const StepTitle: React.FC<IProps> = props => {
  const {title, documentationLink = '', isStepActive = false, isStepApplicable = true} = props;

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

      {documentationLink && isStepActive && (
        <S.LearnMoreContainer href={documentationLink} rel="noopener noreferrer" target="_blank">
          Learn more
          <ExternalLinkIcon height={15} width={15} />
        </S.LearnMoreContainer>
      )}
    </>
  );
};

export default StepTitle;
