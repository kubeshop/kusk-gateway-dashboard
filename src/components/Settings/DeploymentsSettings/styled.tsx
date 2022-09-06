import {Card as AntCard} from 'antd';

import styled from 'styled-components';

import {Shadows} from '@styles/global';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const Deployments = styled.div`
  display: grid;
  gap: 24px;
`;

export const Card = styled(AntCard)`
  box-shadow: ${Shadows.cardShadow};
`;
