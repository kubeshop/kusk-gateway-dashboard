import {Input} from 'antd';

import {ExclamationCircleOutlined as RawExclamationCircleOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

export const ExclamationCircleOutlined = styled(RawExclamationCircleOutlined)`
  margin-right: 10px;
`;

export const Textarea = styled(Input.TextArea)`
  background-color: ${Colors.grey2};

  ${GlobalScrollbarStyle}
`;

export const WarningsContainer = styled.div`
  color: ${Colors.yellow500};
  margin-bottom: 15px;
`;
