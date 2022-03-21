import styled from 'styled-components';

import Colors from '@styles/colors';

export const DashboardContainer = styled.div<{$gridTemplateColumns: string}>`
  ${({$gridTemplateColumns}) => `
    grid-template-columns: ${$gridTemplateColumns};
  `}

  display: grid;
  height: 100%;
  width: 100%;
  background: ${Colors.grey3};
`;
