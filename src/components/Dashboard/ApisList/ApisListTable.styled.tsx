import {Table as RawTable, Tag as RawTag} from 'antd';

import {RightOutlined as RawRightOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const ApiLabel = styled.span<{$selected: boolean}>`
  ${({$selected}) => `
    color: ${$selected ? Colors.whitePure : Colors.grey9};
    font-weight: ${$selected ? '700' : '400'};
  `}
`;

export const FalseTag = styled(RawTag)`
  color: ${Colors.magenta2};
  background: ${Colors.magenta0};
  border: 2px solid ${Colors.magenta1};
`;

export const RightOutlined = styled(RawRightOutlined)<{$disabled: boolean}>`
  ${({$disabled}) => `
    cursor: ${$disabled ? 'not-allowed' : 'pointer'} !important;
    color: ${$disabled ? Colors.grey5 : Colors.whitePure};
  `}
  font-size: 20px;
`;

export const Table = styled(RawTable)`
  border: 1px solid ${Colors.grey4};

  & .ant-table-thead {
    background: ${Colors.grey3};
  }

  & .ant-table-tbody > tr:hover > td {
    background: ${Colors.grey2};
  }

  & .ant-table-thead > tr > th {
    background: ${Colors.grey3};
    color: ${Colors.grey9};
    border-bottom: 1px solid ${Colors.grey4};
  }

  & .ant-table-tbody > tr > td {
    background: ${Colors.grey2};
    border-bottom: 1px solid ${Colors.grey4};
    color: ${Colors.grey9};
  }
`;

export const TrueTag = styled(RawTag)`
  color: ${Colors.cyan2};
  background: ${Colors.cyan0};
  border: 2px solid ${Colors.cyan1};
`;
