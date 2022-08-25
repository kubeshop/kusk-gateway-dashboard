import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';

import styled from 'styled-components';

export const InfoPaneCRD = styled(SyntaxHighlighter)`
  overflow-x: hidden !important;
  margin: 0 !important;
  padding: 24px;
  border-radius: 4px;
  code {
    font-family: roboto !important;
    font-weight: 700 !important;
    font-size: 14px !important;
    word-break: break-word !important;
  }
`;
