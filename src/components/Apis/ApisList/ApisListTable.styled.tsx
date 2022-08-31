import {Menu as RawMenu, Table as RawTable, Tag, Typography} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';
import {Shadows, Transitions} from '@styles/global';

export const Table = styled(RawTable)`
  & .ant-table-tbody > tr:hover > td {
    cursor: pointer;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const GridItem = styled.div`
  position: relative;
  padding: 20px;
  border: 1px solid ${Colors.zinc2};
  border-radius: 4px;
  box-shadow: ${Shadows.cardShadow};
  cursor: pointer;
  transition: ${Transitions.default};
  &:hover {
    border-color: ${Colors.blue400};
  }
`;

export const ApiInfoContainer = styled.div`
  display: flex;
  gap: 40px;
`;

export const ApiInfo = styled.div`
  display: grid;
  grid-gap: 4px;
`;

export const InfoLabel = styled(Typography.Text)`
  color: #94a3b8;
  text-transform: uppercase;
`;

export const InfoTag = styled(Tag)`
  border: 1px solid #d4d4d8;
  padding: 4px;
`;

export const Menu = styled(RawMenu)`
  position: absolute;
  top: 0px;
  right: -10px;
  border-bottom: none !important;
  background: none;

  .ant-menu-item:hover::after,
  .ant-menu-submenu:hover::after,
  .ant-menu-item-active::after,
  .ant-menu-submenu-active::after,
  .ant-menu-item-open::after,
  .ant-menu-submenu-open::after,
  .ant-menu-item-selected::after,
  .ant-menu-submenu-selected::after {
    border-bottom: 2px solid transparent !important;
  }
`;
