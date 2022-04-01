import {Table as RawTable} from 'antd';

import {RightOutlined as RawRightOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import {ListTableStyle} from '@utils/listTable';

import Colors from '@styles/colors';

export const RightOutlined = styled(RawRightOutlined)<{$disabled: boolean}>`
  ${({$disabled}) => `
    cursor: ${$disabled ? 'not-allowed' : 'pointer'} !important;
    color: ${$disabled ? Colors.grey5 : Colors.whitePure};
  `}
  font-size: 20px;
`;

export const Table = styled(RawTable)`
  ${ListTableStyle}
`;

export const TableColumnLabel = styled.div<{$selected: boolean}>`
  ${({$selected}) => `
    color: ${$selected ? Colors.whitePure : Colors.grey9};
    font-weight: ${$selected ? '700' : '400'};
  `}
`;
