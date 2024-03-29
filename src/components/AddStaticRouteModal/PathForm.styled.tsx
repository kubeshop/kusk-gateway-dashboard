import {Checkbox as AntCheckbox} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const CheckboxGroup = styled(AntCheckbox.Group)`
  display: grid;
`;

export const Checkbox = styled(AntCheckbox)`
  margin-left: 0 !important;
  margin-bottom: 16px !important;

  & .ant-checkbox-disabled + span {
    opacity: 0.5;
  }

  & .ant-checkbox-disabled .ant-checkbox-inner {
    opacity: 0.5;
    background-color: ${Colors.blue500} !important;
    border-color: ${Colors.blue500} !important;
  }

  & .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: white !important;
  }
`;
