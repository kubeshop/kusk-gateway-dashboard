import {Table as RawTable} from 'antd';

import styled from 'styled-components';

export const Table = styled(RawTable)`
  & .ant-table-tbody > tr:hover > td {
    cursor: pointer;
  }
`;
