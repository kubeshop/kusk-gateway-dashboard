import styled from 'styled-components';

import Colors from '@styles/colors';

export const MonacoContainer = styled.div`
  padding-left: 0px;
  margin: 0px;
  display: flex;
  width: 100%;
  border-radius: 4px;
  border: 1px solid ${Colors.zinc2};
  background: ${Colors.whitePure};

  & .react-monaco-editor-container :first-child {
    border-radius: 4px !important;
  }
`;
