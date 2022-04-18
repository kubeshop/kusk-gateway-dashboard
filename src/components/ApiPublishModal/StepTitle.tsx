import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';
import {StepNotApplicableTooltip} from '@constants/tooltips';

import * as S from './StepTitle.styled';

interface IProps {
  title: string;
  isStepApplicable?: boolean;
}

const StepTitle: React.FC<IProps> = props => {
  const {title, isStepApplicable = true} = props;

  return (
    <S.StepTitleContainer>
      {title}

      {!isStepApplicable && (
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={StepNotApplicableTooltip}>
          <S.ExclamationCircleOutlined />
        </Tooltip>
      )}
    </S.StepTitleContainer>
  );
};

export default StepTitle;
