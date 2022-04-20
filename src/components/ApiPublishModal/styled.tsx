import {Alert as RawAlert, Steps} from 'antd';

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
  height: 550px;
  overflow-y: auto;
  ${GlobalScrollbarStyle}
`;

export const RadioGroupContainer = styled.div`
  margin-bottom: 15px;
`;

export const Step = styled(Steps.Step)`
  & .ant-steps-icon {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .ant-steps-item-title {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const StepsContainer = styled.div`
  padding-right: 5px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  ${GlobalScrollbarStyle};
`;
