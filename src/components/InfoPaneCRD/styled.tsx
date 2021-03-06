import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

export const InfoPaneCRD = styled(SyntaxHighlighter)`
  height: 100%;
  overflow-x: hidden !important;
  margin: 0 !important;

  & code {
    word-break: break-word !important;
  }

  ${GlobalScrollbarStyle};
`;
