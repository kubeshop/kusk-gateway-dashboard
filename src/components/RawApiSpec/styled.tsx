import {Tree as RawTree} from 'antd';

import styled from 'styled-components';

import {SwaggerUIStyle} from '@utils/swaggerUI';

import Colors from '@styles/colors';

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

export const Tree = styled(RawTree)`
  background: ${Colors.grey3};
  color: ${Colors.whitePure};
  margin-bottom: 20px;

  & .ant-tree-switcher {
    background: ${Colors.grey3};
  }

  & .ant-tree-title {
    font-size: 14px;
  }

  & .ant-tree-node-content-wrapper:hover {
    background-color: ${Colors.grey3};
    cursor: default;
  }

  & .ant-tree-node-selected {
    background-color: ${Colors.grey3} !important;
  }

  & .extension-property-value {
    color: ${Colors.grey1};
    font-weight: bold;
  }
`;
