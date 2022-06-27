import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

import {Button} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

export const Container = styled.div`
  display: grid;
  justify-items: end;
`;

export const RawYaml = styled(SyntaxHighlighter)`
  grid-area: 1/1 /2/3;
  height: 100%;
  overflow-x: hidden !important;
  margin: 0 !important;

  & code {
    word-break: break-word !important;
  }

  ${GlobalScrollbarStyle};
`;

export const ClipboardButton = styled(Button)`
  grid-area: 1/2/1/2;
  margin: 8px !important;
`;
