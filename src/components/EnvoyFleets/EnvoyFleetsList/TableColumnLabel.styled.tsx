import {RightOutlined as RawRightOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const RightOutlined = styled(RawRightOutlined)<{$disabled: boolean}>`
  ${({$disabled}) => `
    cursor: ${$disabled ? 'not-allowed' : 'pointer'} !important;
    color: ${$disabled ? Colors.grey5 : Colors.whitePure};
  `}
  font-size: 20px;
`;

export const TableColumnLabelContainer = styled.div<{$selected: boolean}>`
  ${({$selected}) => `
    color: ${$selected ? Colors.whitePure : Colors.grey9};
    font-weight: ${$selected ? '700' : '400'};
  `}

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
