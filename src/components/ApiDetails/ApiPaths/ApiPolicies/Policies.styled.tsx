import {Card as AntCard} from 'antd';

import AntIcon from '@ant-design/icons';

import styled from 'styled-components';

import {SubHeading as RawSubHeading} from '@components/AntdCustom';

import Colors from '@styles/colors';
import {Shadows, Transitions} from '@styles/global';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin: 32px 0;
`;

export const CardContent = styled.div`
  display: grid;
`;

export const SubHeading = styled(RawSubHeading)`
  margin: 12px 0;
`;

export const Card = styled(AntCard)`
  .ant-card-bordered {
    box-shadow: ${Shadows.cardShadow};
    transition: ${Transitions.default};
    border: 1px solid transparent;
  }

  &:hover {
    border-color: ${Colors.blue400};
    box-shadow: ${Shadows.cardShadow};
    transition: ${Transitions.default};
  }

  .ant-card-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .ant-card-body::before {
    content: none;
  }

  .ant-card-body::after {
    content: none;
  }
`;

export const Icon = styled(AntIcon)`
  color: ${Colors.blue400};
  vertical-align: sub;
`;
