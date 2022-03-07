import {Button as RawButton} from 'antd';

import {QuestionCircleOutlined as RawQuestionsCircleOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Button = styled(RawButton)`
  width: max-content;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  margin-top: 5px;
`;

export const InputLabel = styled.label`
  color: ${Colors.whitePure};
  font-size: 12px;
`;

export const QuestionCircleOutlined = styled(RawQuestionsCircleOutlined)`
  margin-left: 5px;
  cursor: pointer;
`;
