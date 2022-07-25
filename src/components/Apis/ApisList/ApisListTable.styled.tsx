import {Menu as RawMenu, Table as RawTable, Tag, Typography} from 'antd';

import styled from 'styled-components';

export const Table = styled(RawTable)`
  & .ant-table-tbody > tr:hover > td {
    cursor: pointer;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const GridItem = styled.div`
  position: relative;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.04);
  cursor: pointer;
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
  right: 0px;
  border-bottom: none !important;

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
