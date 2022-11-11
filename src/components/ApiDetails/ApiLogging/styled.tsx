import {Table as AntTable, Typography} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  padding: 32px;
  display: grid;
  grid-template-rows: auto auto 1fr;
  height: calc(100vh - 60px);

  &.ant-dropdown-menu-item {
    color: ${Colors.zinc7} !important;
  }
`;

export const H1 = styled(Typography.Title)`
  margin-bottom: 28px !important;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const Table = styled(AntTable)`
  position: relative;
  display: flex;
  width: 100%;
  overflow: auto;

  .ant-table-thead > tr > th {
    background-color: ${Colors.zinc5};
  }
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background-color: ${Colors.blue50};
  }
  .ant-table-row > .ant-table-cell {
    padding: 2px;
    padding-left: 8px;
    height: 24px !important;
    color: ${Colors.zinc6} !important;
    white-space: nowrap;
    overflow-x: hidden;
  }

  .ant-table-tbody > tr > td {
    border-bottom: none;
  }
`;

export const LogContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: auto;
  background-color: white;
  place-self: stretch;
  border-top: 38px solid ${Colors.zinc5};
  & :last-child {
    display: flex;
    flex-direction: column;
  }
`;

export const LogText = styled(Typography.Text).attrs({
  type: 'secondary',
})`
  padding: 2px;
  padding-left: 8px;
  height: 24px !important;
  color: ${Colors.zinc6} !important;
  font-family: 'Roboto Mono';
  line-height: 20px !important;
  white-space: nowrap;
  overflow-x: hidden;
  :hover {
    background-color: ${Colors.blue50};
  }
`;

export const LogsHeader = styled.div`
  width: 100%;
  height: 38px !important;
  background-color: ${Colors.zinc5};
  top: 0px;
`;
