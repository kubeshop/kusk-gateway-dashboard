import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

export const ContentWrapper = styled.div<{$backgroundColor?: string}>`
  ${({$backgroundColor}) => `
    background-color: ${$backgroundColor || 'transparent'};
  `}

  height: 100%;
  position: relative;
  padding: 40px 20px 20px 20px;
  overflow-y: auto;

  ${GlobalScrollbarStyle};
`;

export const ErrorLabel = styled.span`
  color: red;
`;
