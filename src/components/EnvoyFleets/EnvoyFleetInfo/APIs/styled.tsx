import {Table as RawTable} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Table = styled(RawTable)`
  & .ant-table-cell-row-hover {
    background-color: ${Colors.grey3} !important;
    cursor: pointer;
  }
`;
