import styled from 'styled-components';

import {CloseOutlined as RawCloseOutlined} from '@ant-design/icons';

import Colors from 'src/styles/colors';

export const ApiInfoContainer = styled.div`
  position: relative;
  background: ${Colors.grey4};
  padding: 40px 20px 20px 20px;

  & .selected-tab {
    color: ${Colors.grey9};
  }

  & .selected-tab::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    border: 1px solid ${Colors.grey9};
  }
`;

export const CloseOutlined = styled(RawCloseOutlined)`
  position: absolute;
  right: 20px;
  top: 20px;
  color: ${Colors.grey0};
  font-size: 18px;
  cursor: pointer;
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const TabsLabel = styled.span`
  color: ${Colors.grey1};
  font-size: 16px;
  cursor: pointer;
  position: relative;
`;
