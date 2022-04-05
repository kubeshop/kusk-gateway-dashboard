import AntdIcon from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const DashboardMenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${Colors.grey4};
`;

export const Icon = styled(AntdIcon)<{$active: boolean; $border?: boolean}>`
  ${({$active, $border}) => `
    color: ${$active ? Colors.whitePure : Colors.grey1}};
    border-bottom: ${$border ? `1px solid ${Colors.grey4}` : ''};
`};

  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0px 16px 0px;

  &:hover {
    cursor: pointer;
    color: ${Colors.whitePure};
  }

  & svg {
    width: 32px;
    height: 32px;
  }
`;
