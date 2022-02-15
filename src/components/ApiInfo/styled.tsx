import styled from 'styled-components';

import Colors from 'src/styles/colors';

export const ApiInfoContainer = styled.div`
  background: ${Colors.grey3};
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

export const TabsLabel = styled.span`
  color: ${Colors.grey0};
  font-size: 16px;
  cursor: pointer;
  position: relative;
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 20px;
`;
