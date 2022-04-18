import {ExclamationCircleOutlined as RawExclamationCircleOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const ExclamationCircleOutlined = styled(RawExclamationCircleOutlined)`
  color: ${Colors.yellow400};
  cursor: pointer;
`;

export const StepTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
