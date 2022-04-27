import {Table as RawTable} from 'antd';

import styled from 'styled-components';

export const Table = styled(RawTable)`
  & .ant-table-cell-row-hover {
    background-color: transparent !important;
  }
`;
