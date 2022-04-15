import {Input as RawInput} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

export const Input = styled(RawInput)`
  background-color: ${Colors.grey2};
  width: 100%;
`;

export const Textarea = styled(Input.TextArea)`
  background-color: ${Colors.grey2};

  ${GlobalScrollbarStyle}
`;
