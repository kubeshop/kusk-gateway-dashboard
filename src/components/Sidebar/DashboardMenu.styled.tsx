import AntdIcon from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const DashboardMenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Icon = styled(AntdIcon)<{$active: boolean}>`
  ${({$active}) => `
    color: ${$active ? Colors.whitePure : Colors.grey0}}
`}

  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in;

  &:hover {
    cursor: pointer;
    color: ${Colors.whitePure};
  }

  & svg {
    width: 32px;
    height: 32px;
  }
`;
