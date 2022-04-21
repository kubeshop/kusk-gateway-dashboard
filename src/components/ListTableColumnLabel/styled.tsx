import {RightOutlined as RawRightOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const RightOutlined = styled(RawRightOutlined)<{$disabled: boolean}>`
  ${({$disabled}) => `
    color: ${$disabled ? Colors.grey5 : Colors.whitePure};
  `}
  font-size: 20px;
`;

export const ListTableColumnLabelContainer = styled.div<{$selected: boolean}>`
  ${({$selected}) => `
    color: ${$selected ? Colors.whitePure : Colors.grey9};
    font-weight: ${$selected ? '700' : '400'};
  `}

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
