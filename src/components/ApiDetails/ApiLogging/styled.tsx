import {Table as AntTable} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  .ant-table-row > .ant-table-cell {
    padding: 2px;
    height: 24px !important;
    color: ${Colors.zinc6} !important;
    white-space: nowrap;
    overflow: hidden;
  }

  .ant-table-tbody > tr > td {
    border-bottom: none;
  }
`;
