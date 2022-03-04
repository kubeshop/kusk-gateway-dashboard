import {Tree as RawTree} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

export const ContentContainer = styled.div`
  margin-top: 20px;
  color: ${Colors.grey9};
  border: 1px solid ${Colors.grey5};
  background: ${Colors.grey2};
  padding: 5px 15px;
  max-height: 700px;
  overflow-y: auto;

  ${GlobalScrollbarStyle};
`;

export const ContentLabel = styled.div<{$level: 'top' | 'path' | 'operation'; $ref: string}>`
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

export const TableOfContentsContainer = styled.div`
  margin-bottom: 30px;
`;

export const TableOfContentsTitle = styled.span`
  font-size: 18px;
  color: ${Colors.whitePure};
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
`;
