import {Table as AntTable, Typography} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  overflow: hidden;
  height: 100%;
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
