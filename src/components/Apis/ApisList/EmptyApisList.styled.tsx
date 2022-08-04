import {Button, Typography} from 'antd';

import {
  BookOutlined as RawBookOutlinedIcon,
  QuestionCircleOutlined as RawQuestionCircleOutlined,
} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const H2 = styled(Typography.Title).attrs({
  level: 2,
})`
  max-width: 375px;
  margin: 24px 0 !important;
  font-size: 28px !important;
  line-height: 32px !important;
  text-align: center;
`;

export const CardGroup = styled.div`
  display: grid;
  grid-gap: 8px;
  margin-bottom: 40px;
`;

export const Card = styled.a.attrs({
  target: '_blank',
})`
  display: flex;
  width: 514px;
  padding: 12px;
  border: 1px solid ${Colors.zinc2};
  border-radius: 4px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.04);

  :hover {
    border: 1px solid ${Colors.blue500};
  }
`;

export const Text = styled(Typography.Text)`
  font-size: 12px;
  flex: 1;
`;

export const TextBlue = styled(Typography.Text)`
  font-size: 12px;
  flex: 1;
  color: ${Colors.blue500};
`;

export const BookOutlinedIcon = styled(RawBookOutlinedIcon)`
  color: ${Colors.zinc4};
  margin-right: 16px;
`;

export const QuestionCircleOutlinedIcon = styled(RawQuestionCircleOutlined)`
  color: ${Colors.zinc4};
  margin-right: 16px;
`;

export const PublishApiButton = styled(Button).attrs({
  type: 'primary',
})`
  margin-top: 24px;
  margin-bottom: 48px;
`;
