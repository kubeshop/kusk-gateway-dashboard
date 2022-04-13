import {Input as RawInput, Space as RawSpace} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Input = styled(RawInput)`
  background-color: ${Colors.grey2};
  width: 100%;
`;

export const Space = styled(RawSpace)`
  display: flex;
  margin-bottom: 10px;

  & .ant-space-item:first-child {
    width: 100%;
  }
`;
