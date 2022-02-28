import {Tree as RawTree} from 'antd';

import styled from 'styled-components';

import {SwaggerUIStyle} from '@utils/swaggerUI';

import Colors from '@styles/colors';

export const ContentContainer = styled.div`
  margin-top: 20px;
`;

export const ErrorLabel = styled.span`
  color: red;
`;

export const ExtensionTitle = styled.h2`
  color: ${Colors.whitePure};
  font-size: 18px;
  margin-bottom: 20px;
`;

export const RawApiSpecContainer = styled.div`
  ${SwaggerUIStyle}
`;

export const TableOfContentsContainer = styled.div`
  margin-bottom: 30px;
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
