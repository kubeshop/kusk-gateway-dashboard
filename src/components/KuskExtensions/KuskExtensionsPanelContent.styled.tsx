import {Tree as RawTree, Typography} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

const {DirectoryTree} = RawTree;

export const ExtensionLabel = styled(Typography.Text)<{$hasChildren: boolean}>`
  color: ${({$hasChildren}) => ($hasChildren ? Colors.grey11 : Colors.blue400)};
`;

export const ExtensionValueLabel = styled.span`
  color: #3f3f46;
`;

export const Tree = styled(DirectoryTree)`
  & .ant-tree-treenode:hover:before {
    background: transparent !important;
  }

  & .ant-tree-node-content-wrapper-normal {
    cursor: default;
  }

  & .ant-tree-treenode-switcher-open,
  & .ant-tree-treenode-switcher-close {
    width: max-content;
  }

  & .ant-tree-switcher-leaf-line::before {
    border-right: 1px dashed #d9d9d9;
  }
  & .ant-tree-switcher-leaf-line::after {
    border-bottom: 1px dashed #d9d9d9;
  }
`;
