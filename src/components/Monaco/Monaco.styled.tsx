import styled from 'styled-components';

export const MonacoContainer = styled.div`
  padding-left: 0px;
  padding-right: 8px;
  margin: 0px;
  border-radius: 4px;
  display: flex;
  min-height: 100%;
  width: 49%;

  & .react-monaco-editor-container :first-child {
    border-radius: 4px !important;
  }
`;
