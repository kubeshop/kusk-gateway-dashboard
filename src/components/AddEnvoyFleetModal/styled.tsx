import {Button, Alert as RawAlert, Modal as RawModal} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

export const Alert = styled(RawAlert)`
  margin-bottom: 20px;
`;

export const Container = styled.div`
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
  ${GlobalScrollbarStyle}
`;

export const Label = styled.div`
  margin-bottom: 8px;
`;

export const Modal = styled(RawModal)`
  & .ant-modal-body {
    background-color: ${Colors.zinc5};
    min-height: fit-content;
    overflow-y: auto;
    ${GlobalScrollbarStyle}
  }

  & .ant-modal-header {
    background-color: ${Colors.zinc5};
    border-bottom: none;
  }

  & .ant-modal-footer {
    background-color: ${Colors.zinc5};
  }
`;

export const RadioGroupContainer = styled.div`
  margin-bottom: 15px;
`;

export const StepsContainer = styled.div`
  padding-right: 5px;
  max-height: fit-content;
  overflow-y: auto;
  overflow-x: hidden;
  ${GlobalScrollbarStyle};
`;

export const PortItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 4px 0;
`;

export const AddPortButton = styled(Button)`
  color: ${Colors.blue500} !important;
  & .anticon {
    color: ${Colors.blue500} !important;
  }
`;
