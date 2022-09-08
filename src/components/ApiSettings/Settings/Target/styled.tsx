import {Card as AntCard, Button, Tag} from 'antd';

import styled, {css} from 'styled-components';

import {Shadows} from '@styles/global';

export const TargetTag = styled(Tag)<{$type: 'redirect' | 'service' | 'host'}>`
  padding: 4px;
  margin-left: 8px;
  vertical-align: middle;
  ${({$type}) => {
    if ($type === 'redirect') {
      return css`
        color: #0369a1;
        background: #e0f2fe;
        border: 1px solid #0ea5e9;
      `;
    }
    if ($type === 'host') {
      return css`
        color: #a16207;
        background: #fef9c3;
        border: 1px solid #facc15;
      `;
    }
    if ($type === 'service') {
      return css`
        color: #d97706;
        background: #fef3c7;
        border: 1px solid #fbbf24;
      `;
    }
  }}
`;

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
