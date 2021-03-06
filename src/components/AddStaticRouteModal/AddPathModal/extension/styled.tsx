import {Radio, Input as RawInput, Select as RawSelect, Button} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const ExtensionSubHeading = styled.h4`
  font-size: 16px;
`;

export const Input = styled(RawInput)`
  background-color: ${Colors.grey2};
  width: 100%;
`;

export const Label = styled.div`
  margin-bottom: 8px;
`;

export const RadioGroup = styled(Radio.Group)`
  margin-bottom: 15px;
`;

export const Select = styled(RawSelect)`
  background-color: ${Colors.grey2};
`;

export const StyledButton = styled(Button)`
  color: ${Colors.blue700};
  border: none;

  &:focus {
    color: ${Colors.blue700};
  }
`;
