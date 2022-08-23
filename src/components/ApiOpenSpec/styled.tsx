import AntdIcon, {ApiOutlined, FileTextOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import {CRDIcon as BaseCRDIcon} from '@components/Icons';

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

export const CRDIcon = styled(AntdIcon).attrs({
  component: BaseCRDIcon,
})<{$active: boolean; $border?: boolean}>`
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

export const ApiOutlinedIcon = styled(ApiOutlined)<{$active: boolean; $border?: boolean}>`
  ${({$active, $border}) => `
    color: ${$active ? Colors.cyan5 : Colors.grey1}};
    border-bottom: ${$border ? `1px solid ${Colors.grey4}` : 'unset'};
`};

  transition: all 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const FileTextOutlinedIcon = styled(FileTextOutlined)<{$active: boolean; $border?: boolean}>`
  ${({$active, $border}) => `
    color: ${$active ? Colors.cyan5 : Colors.grey1}};
    border-bottom: ${$border ? `1px solid ${Colors.grey4}` : 'unset'};
`};

  transition: all 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
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
