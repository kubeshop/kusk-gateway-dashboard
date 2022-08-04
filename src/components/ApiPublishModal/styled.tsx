import {Input, Alert as RawAlert, Modal as RawModal} from 'antd';

import {ExclamationCircleOutlined as RawExclamationCircleOutlined} from '@ant-design/icons';

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
    background-color: ${Colors.cyanBlue};
    min-height: fit-content;
    overflow-y: auto;
    ${GlobalScrollbarStyle}
  }

  & .ant-modal-footer {
    background-color: ${Colors.cyanBlue};
    border-top: none;
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
`;

export const ExclamationCircleOutlined = styled(RawExclamationCircleOutlined)`
  margin-right: 10px;
`;

export const Textarea = styled(Input.TextArea)`
  ${GlobalScrollbarStyle}
`;

export const WarningsContainer = styled.div`
  color: ${Colors.yellow500};
  margin-bottom: 15px;

  & a {
    color: ${Colors.yellow500};
    text-decoration: underline;
  }
`;
