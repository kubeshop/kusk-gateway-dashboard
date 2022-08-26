import AntdIcon from '@ant-design/icons';

import styled from 'styled-components';

import {
  ApiDocsOutlined,
  ApiDocsSolid,
  CRDOutlined,
  CRDSolid,
  ExtensionOutlined,
  ExtensionSolid,
} from '@components/Icons';

import Colors from '@styles/colors';

export const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  padding: 0 32px;
  border-bottom: 1px solid ${Colors.grey10};
`;

export const CRDIcon = styled(AntdIcon).attrs<{$active: boolean; $border?: boolean}>(({$active}) => ({
  component: $active ? CRDSolid : CRDOutlined,
}))<{$active: boolean; $border?: boolean}>`
  ${({$active, $border}) => `
    color: ${$active ? Colors.cyan5 : Colors.grey1}};
    border-bottom: ${$border ? `1px solid ${Colors.grey4}` : 'unset'};
`};
  transition: all 0.2s ease-in;
  padding: 16px 0px 16px 0px;

  &:hover {
    cursor: pointer;
    color: ${Colors.cyan5};
  }

  & svg {
    width: 24px;
    height: 24px;
  }
`;

export const ApiDocsIcon = styled(AntdIcon).attrs<{$active: boolean; $border?: boolean}>(({$active}) => ({
  component: $active ? ApiDocsSolid : ApiDocsOutlined,
}))<{$active: boolean; $border?: boolean}>`
  ${({$active, $border}) => `
    color: ${$active ? Colors.cyan5 : Colors.grey1}};
    border-bottom: ${$border ? `1px solid ${Colors.grey4}` : 'unset'};
`};
  transition: all 0.2s ease-in;
  padding: 16px 0px 16px 0px;

  &:hover {
    cursor: pointer;
    color: ${Colors.cyan5};
  }

  & svg {
    width: 24px;
    height: 24px;
  }
`;

export const ExtensionIcon = styled(AntdIcon).attrs<{$active: boolean; $border?: boolean}>(({$active}) => ({
  component: $active ? ExtensionSolid : ExtensionOutlined,
}))<{$active: boolean; $border?: boolean}>`
  ${({$active, $border}) => `
    color: ${$active ? Colors.cyan5 : Colors.grey1}};
    border-bottom: ${$border ? `1px solid ${Colors.grey4}` : 'unset'};
`};
  transition: all 0.2s ease-in;
  padding: 16px 0px 16px 0px;

  &:hover {
    cursor: pointer;
    color: ${Colors.cyan5};
  }

  & svg {
    width: 24px;
    height: 24px;
  }
`;

export const RightPane = styled.div`
  position: absolute;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 20px;
  border-left: 1px solid ${Colors.grey10};
  background-color: ${Colors.zinc5};
`;
