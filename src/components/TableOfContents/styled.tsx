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
