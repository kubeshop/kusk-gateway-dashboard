import {Table as RawTable} from 'antd';

import styled from 'styled-components';

import {ListTableStyle} from '@utils/listTable';

import Colors from '@styles/colors';

export const ApiLabel = styled.span<{$selected: boolean}>`
  ${({$selected}) => `
    color: ${$selected ? Colors.whitePure : Colors.grey9};
    font-weight: ${$selected ? '700' : '400'};
  `}
`;

export const Table = styled(RawTable)`
  ${ListTableStyle}
`;
