import {Table as RawTable} from 'antd';

import styled from 'styled-components';

import {ListTableStyle} from '@utils/listTable';

export const Table = styled(RawTable)`
  ${ListTableStyle}
`;
