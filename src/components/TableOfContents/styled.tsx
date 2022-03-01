import {Tag as RawTag} from 'antd';

import styled from 'styled-components';

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
  }
`;

export const LabelTag = styled(RawTag)`
  background-color: ${Colors.grey4};
  color: ${Colors.whitePure};
  margin: 0;
`;

export const TableOfContentsContainer = styled.div`
  margin-bottom: 30px;
`;

export const TableOfContentsLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TableOfContentsTitle = styled.span`
  font-size: 18px;
  color: ${Colors.whitePure};
`;
