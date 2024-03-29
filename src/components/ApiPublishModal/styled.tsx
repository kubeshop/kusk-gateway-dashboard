import {Input, Alert as RawAlert, Modal as RawModal} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

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
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  overflow-y: auto;
  ${GlobalScrollbarStyle}
`;

export const Label = styled.div`
  margin-bottom: 8px;
`;

export const Modal = styled(RawModal)`
  & .ant-modal-body {
    min-height: fit-content;
    overflow-y: auto;
    ${GlobalScrollbarStyle}
  }
`;

export const Textarea = styled(Input.TextArea)`
  ${GlobalScrollbarStyle}
`;

export const AddDeploymentOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  &::before {
    content: '';
    position: absolute;
    height: 1px;
    left: 0;
    right: 0;
    top: 0;
    background-color: ${Colors.zinc2};
  }
`;
