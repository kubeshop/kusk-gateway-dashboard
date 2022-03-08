import {Select as RawSelect} from 'antd';

import {QuestionCircleOutlined as RawQuestionsCircleOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const ApisContainer = styled.div`
  padding: 40px 20px 20px 20px;
`;

export const DashboardContainer = styled.div<{$gridTemplateColumns: string}>`
  ${({$gridTemplateColumns}) => `
    grid-template-columns: ${$gridTemplateColumns};
  `}

  display: grid;
  height: 100%;
  width: 100%;
  background: ${Colors.grey3};
`;

export const DashboardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 10px;
`;

export const DashboardTitleLabel = styled.h2`
  color: ${Colors.grey9};
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  margin: 0;
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
