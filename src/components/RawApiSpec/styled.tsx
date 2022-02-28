import {Tag as RawTag, Tree as RawTree} from 'antd';

import styled from 'styled-components';

import {SwaggerUIStyle} from '@utils/swaggerUI';

import Colors from '@styles/colors';

export const ContentContainer = styled.div`
  margin-top: 20px;
  color: ${Colors.grey9};
  border: 1px solid ${Colors.grey5};
  background: ${Colors.grey2};
  padding: 5px 15px;
`;

export const ContentLabel = styled.div<{$level: 'top' | 'path' | 'operation'; $ref: string}>`
  margin: 10px 0px;

  ${({$level}) => `
    margin-left: ${$level === 'top' ? '0px' : $level === 'path' ? '15px' : '30px'}; 

  `}

  width: max-content;
  transition: all 0.2s ease-in;

  &:hover {
    ${({$ref}) => {
      if ($ref) {
        return `
          letter-spacing: 0.4px;
          color: ${Colors.whitePure};
          cursor: pointer;
        `;
      }
    }}
`;

export const ErrorLabel = styled.span`
  color: red;
`;

export const ExtensionTitle = styled.h2`
  color: ${Colors.whitePure};
  font-size: 18px;
  margin-bottom: 20px;
`;

export const LabelTag = styled(RawTag)`
  background-color: ${Colors.grey4};
  color: ${Colors.whitePure};
  margin-left: 5px;
`;

export const RawApiSpecContainer = styled.div`
  ${SwaggerUIStyle}
`;

export const TableOfContentsContainer = styled.div`
  margin-bottom: 30px;
`;

export const TableOfContentsLabel = styled.div`
  display: flex;
  align-items: center;
`;

export const TableOfContentsTitle = styled.span`
  font-size: 18px;
  color: ${Colors.whitePure};
`;

export const Tree = styled(RawTree)<{$level: 'operation' | 'top'}>`
  ${({$level}) => `
    background: ${$level === 'operation' ? Colors.swaggerUIGrey : Colors.grey3};
  `}

  color: ${Colors.whitePure};
  margin-bottom: 20px;
  padding: 10px;

  & .ant-tree-switcher {
    ${({$level}) => `
      background: ${$level === 'operation' ? Colors.swaggerUIGrey : Colors.grey3};
    `}
  }

  & .ant-tree-title {
    font-size: 14px;
  }

  & .ant-tree-node-content-wrapper:hover {
    ${({$level}) => `
      background-color: ${$level === 'operation' ? Colors.swaggerUIGrey : Colors.grey3};
    `}

    cursor: default;
  }

  & .ant-tree-node-selected {
    ${({$level}) => `
      background-color: ${$level === 'operation' ? Colors.swaggerUIGrey : Colors.grey3} !important;
    `}
  }

  & .extension-property-value {
    color: ${Colors.grey1};
    font-weight: bold;
  }
`;
