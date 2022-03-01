import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';
import {KuskExtensionTooltip} from '@constants/tooltips';

import * as S from './KuskExtensionIcon.styled';

const KuskExtensionIcon: React.FC = () => {
  return (
    <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={KuskExtensionTooltip}>
      <S.ApiOutlined />
    </Tooltip>
  );
};

export default KuskExtensionIcon;
