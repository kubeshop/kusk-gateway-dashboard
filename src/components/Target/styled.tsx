import {Card as AntCard, Button, Typography} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';
import {Shadows} from '@styles/global';

export const SaveButton = styled(Button).attrs({
  type: 'primary',
})`
  display: block;
  margin-left: auto;
  width: 124px;
`;

export const Card = styled(AntCard)`
  box-shadow: ${Shadows.cardShadow};
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .ant-form-item {
    margin-left: auto;
    margin-bottom: 0;
  }
`;

export const Heading = styled(Typography.Text)`
  font-size: 24px;
  line-height: 30px;
  font-weight: bold;
  color: ${Colors.zinc9};
`;
