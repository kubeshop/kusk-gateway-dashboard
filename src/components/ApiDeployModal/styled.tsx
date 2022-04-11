import {Input as RawInput, Select as RawSelect, Steps} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
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

export const ExtensionContainer = styled.div`
  margin-bottom: 10px;
`;

export const ExtensionHeading = styled.h3`
  font-size: 18px;
`;

export const ExtensionSubHeading = styled.h4`
  font-size: 16px;
`;

export const Input = styled(RawInput)`
  background-color: ${Colors.grey2};
`;

export const Select = styled(RawSelect)`
  background-color: ${Colors.grey2};
`;

export const Step = styled(Steps.Step)`
  & .ant-steps-icon {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .ant-steps-item-title {
    width: 155px;
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

export const Textarea = styled(Input.TextArea)`
  background-color: ${Colors.grey2};

  ${GlobalScrollbarStyle}
`;
