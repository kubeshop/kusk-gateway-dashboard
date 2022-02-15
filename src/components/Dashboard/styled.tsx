import styled from 'styled-components';

import Colors from 'src/styles/colors';

export const ApisContainer = styled.div`
  padding: 40px 20px 20px 20px;
`;

export const DashboardContainer = styled.div<{$gridTemplateColumns: string}>`
  ${({$gridTemplateColumns}) => `
    grid-template-columns: ${$gridTemplateColumns};
  `}

  display: grid;
  height: 100%;
  width: 100%;
  background: ${Colors.grey3};
`;

export const DashboardTitle = styled.h2`
  color: ${Colors.grey9};
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
`;

export const ErrorLabel = styled.span`
  color: red;
`;
