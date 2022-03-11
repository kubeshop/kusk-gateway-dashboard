import {Select as RawSelect} from 'antd';

import {QuestionCircleOutlined as RawQuestionsCircleOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const ApisListContainer = styled.div`
  padding: 40px 20px 20px 20px;
`;

export const EnvoyFleetFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ErrorLabel = styled.span`
  color: red;
`;

export const QuestionCircleOutlined = styled(RawQuestionsCircleOutlined)`
  cursor: pointer;
`;

export const Select = styled(RawSelect)`
  width: 300px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 10px;
`;

export const TitleLabel = styled.h2`
  color: ${Colors.grey9};
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  margin: 0;
`;
