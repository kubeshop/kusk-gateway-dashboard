import {Input as RawInput, Select as RawSelect} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const ExtensionSubHeading = styled.h4`
  font-size: 16px;
`;

export const Input = styled(RawInput)`
  background-color: ${Colors.grey2};
  width: 100%;
`;

export const Select = styled(RawSelect)`
  background-color: ${Colors.grey2};
`;
