import {ExclamationCircleOutlined as RawExclamationCircleOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const ExclamationCircleOutlined = styled(RawExclamationCircleOutlined)`
  color: ${Colors.blue500};
  font-size: 15px;
  cursor: pointer;
`;

export const LearnMoreContainer = styled.a`
  width: max-content;
  margin-top: -7px;
  margin-bottom: 7px;
  font-size: 13px;
  color: ${Colors.blue600};
  opacity: 0.9;

  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StepTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
