import {Alert as RawAlert, Modal as RawModal} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

export const Alert = styled(RawAlert)`
  margin-bottom: 20px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-column-gap: 10px;

  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const FormContainer = styled.div`
  padding-right: 10px;
  overflow-y: auto;
  ${GlobalScrollbarStyle}
`;

export const Label = styled.div`
  margin-bottom: 8px;
`;

export const Modal = styled(RawModal)`
  top: min(10%, 100px);

  & .ant-modal-body {
    height: 70vh;
    overflow-y: auto;
    ${GlobalScrollbarStyle}
  }
`;

export const RadioGroupContainer = styled.div`
  margin-bottom: 15px;
`;

export const StepsContainer = styled.div`
  padding-right: 5px;
  height: fit-content;
  position: sticky;
  top: 0;
  ${GlobalScrollbarStyle};
`;
