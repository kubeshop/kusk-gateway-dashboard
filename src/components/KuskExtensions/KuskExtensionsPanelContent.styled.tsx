import {Tree as RawTree} from 'antd';

import styled from 'styled-components';

const {DirectoryTree} = RawTree;

export const ExtensionValueLabel = styled.span<{$type: string}>`
  ${({$type}) => `
    color: ${
      $type === 'number' ? 'rgb(211, 99, 99)' : $type === 'boolean' ? 'rgb(252, 194, 140)' : 'rgb(162, 252, 162)'
    }
  `}
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
`;
