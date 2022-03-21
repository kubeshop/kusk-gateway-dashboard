import {Button as RawButton} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const CollapseExpandOperationsPluginContainer = styled.div`
  position: relative;
`;

export const CollapseOperationsButton = styled(RawButton)`
  position: absolute;
  top: 12px;
  right: 0;

  color: ${Colors.whitePure};
  border-color: ${Colors.whitePure};

  & span {
    font-size: 14px;
  }

  &:active,
  &:focus {
    color: ${Colors.whitePure};
    border-color: ${Colors.whitePure};
  }
`;
