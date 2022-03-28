import {Button as RawButton, Tree as RawTree} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

export const ContentContainer = styled.div`
  position: relative;
  margin-top: 10px;
  color: ${Colors.grey9};
  border: 1px solid ${Colors.grey5};
  background: ${Colors.grey2};

  & .react-resizable {
    padding: 5px 15px;
    overflow-y: auto;

    ${GlobalScrollbarStyle}
  }

  & .toc-custom-handle {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 3px;
    cursor: row-resize;
  }
`;

export const ContentLabel = styled.div<{$level: 'top' | 'path' | 'operation'; $ref?: string}>`
  ${({$level}) => `
    margin-bottom: ${$level === 'path' ? '5px' : '0px'};
  `}

  width: max-content;
  transition: all 0.2s ease-in;

  &:hover {
    ${({$ref}) => {
      if ($ref) {
        return `
          color: ${Colors.whitePure};
          cursor: pointer;
        `;
      }
    }}
  }
`;

export const ExpandCollapseButton = styled(RawButton)`
  color: ${Colors.whitePure};
  border-color: ${Colors.whitePure};

  & span {
    font-size: 14px;
  }

  &:active,
  &:focus {
    color: ${Colors.whitePure};
    border-color: ${Colors.whitePure};
  }
`;

export const TableOfContentsContainer = styled.div`
  margin-bottom: 30px;
`;

export const TableOfContentsTitle = styled.div`
  font-size: 18px;
  color: ${Colors.whitePure};
  display: flex;
  justify-content: space-between;
`;

export const Tree = styled(RawTree)`
  background-color: ${Colors.grey2};
  color: ${Colors.grey9};

  & .ant-tree-switcher {
    background: ${Colors.grey2};
  }

  & .ant-tree-node-content-wrapper {
    cursor: default;

    &:hover {
      background-color: ${Colors.grey2};
    }
  }

  & .ant-tree-node-selected {
    background-color: ${Colors.grey2} !important;
  }

  & .tree-root-object {
    & .ant-tree-switcher {
      pointer-events: none;
      color: ${Colors.grey5};
    }
  }
`;
