import styled from 'styled-components';

export const DashboardContainer = styled.div<{$isTableItemSelected: boolean}>`
  ${({$isTableItemSelected}) => `
    grid-template-columns: 1fr ${$isTableItemSelected ? 'max-content' : ''};
  `}

  display: grid;
  height: 100%;
  width: 100%;
`;

export const DashboardItemInfoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

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
