import styled from 'styled-components';

import Colors from '@styles/colors';

export const ApiInfoContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  & .dashboard-custom-handle {
    position: absolute;
    top: 50%;
    left: -5px;
    width: 10px;
    height: 100%;
    cursor: col-resize;
    transform: translateY(-50%);
    background-color: transparent;
  }
`;

export const DashboardContainer = styled.div<{$isApiSelected: boolean}>`
  ${({$isApiSelected}) => `
    grid-template-columns: 1fr ${$isApiSelected ? 'max-content' : ''};
  `}

  display: grid;
  height: 100%;
  width: 100%;
  background: ${Colors.grey3};
`;
