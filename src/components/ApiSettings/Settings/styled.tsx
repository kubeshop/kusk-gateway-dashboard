import {Button, Card} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  display: grid;
  grid-gap: 32px;
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  margin-bottom: 16px;
`;

export const SaveButton = styled(Button).attrs({
  type: 'primary',
})`
  display: block;
  margin-left: auto;
  width: 124px;
`;

export const DeleteCard = styled(Card).attrs({
  bordered: true,
})`
  border: 1px solid ${Colors.pink};
`;

export const DeleteButton = styled(Button)`
  display: block;
  margin-left: auto;
  width: 124px;
  background-color: ${Colors.pink};
  color: white;
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Divider = styled.div`
  display: block;
  position: relative;
  margin: 16px 0;
  height: 8px;
  &::before {
    content: '';
    position: absolute;
    left: -24px;
    right: -24px;
    top: 0;
    height: 1px;
    background-color: #f0f0f0;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
`;

export const AddButton = styled(Button)`
  display: block;
  margin: 0 auto;
`;
