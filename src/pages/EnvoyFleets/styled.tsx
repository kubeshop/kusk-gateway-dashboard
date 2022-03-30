import styled from 'styled-components';

export const EnvoyFleetsContainer = styled.div<{$isEnvoyFleetSelected: boolean}>`
  ${({$isEnvoyFleetSelected}) => `
    grid-template-columns: 1fr ${$isEnvoyFleetSelected ? 'max-content' : ''};
  `}

  display: grid;
  height: 100%;
  width: 100%;
`;

export const EnvoyFleetInfoContainer = styled.div`
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
