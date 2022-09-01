import styled from 'styled-components';

import Colors from '@styles/colors';

export const MonacoContainer = styled.div<{$fullWidth?: boolean}>`
  padding-left: 0px;
  padding-right: 8px;
  margin: 0px;
  border-radius: 4px;
  display: flex;
  min-height: calc(100% - 118px);
  width: ${({$fullWidth}) => ($fullWidth ? '100%' : '49%')};
  border: 1px solid ${Colors.zinc2};
  background: ${Colors.whitePure};

  & .react-monaco-editor-container :first-child {
    border-radius: 4px !important;
  }
`;
