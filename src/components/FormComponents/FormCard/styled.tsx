import {Card as AntCard, Button} from 'antd';

import styled from 'styled-components';

import {Shadows} from '@styles/global';

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-left: auto;
`;

export const SaveButton = styled(Button).attrs({
  type: 'primary',
})`
  display: block;
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
