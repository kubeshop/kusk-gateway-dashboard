import {Button, Collapse as RawCollapse, Tree as RawTree} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

export const Collapse = styled(RawCollapse)`
  margin-bottom: 30px;

  & .ant-collapse-content-box {
    padding-bottom: 0px !important;
  }
`;

export const ContentContainer = styled.div`
  position: relative;
  margin-top: 10px;

  & .react-resizable {
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
          cursor: pointer;
        `;
      }
    }}
  }
`;

export const ExpandCollapseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Panel = styled(RawCollapse.Panel)`
  & .ant-collapse-header {
    padding: 10px !important;
    font-weight: bold;
    align-items: center !important;
  }

  & .ant-collapse-arrow {
    margin-right: 8px !important;
  }
`;

export const TreeContainer = styled.div`
  position: relative;
`;

export const CollapseTreeButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  margin: 8px !important;
`;

export const Tree = styled(RawTree)`
  & .ant-tree-switcher {
  }

  & .ant-tree-node-content-wrapper {
    cursor: default;

    &:hover {
    }
  }

  & .ant-tree-node-selected {
  }

  & .tree-root-object {
    & .ant-tree-switcher {
      pointer-events: none;
    }
  }
`;
