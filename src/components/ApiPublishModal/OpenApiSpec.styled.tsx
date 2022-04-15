import {Input} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

export const Textarea = styled(Input.TextArea)`
  background-color: ${Colors.grey2};

  ${GlobalScrollbarStyle}
`;
