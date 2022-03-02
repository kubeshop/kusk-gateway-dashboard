import {Tag as RawTag} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

const swaggerUIMethodsColors: {[method: string]: string} = {
  delete: '#F93E3E',
  get: '#61AFFE',
  head: '#9012FE',
  options: '#0D5AA7',
  patch: '#50E3C2',
  post: '#49CC90',
  put: '#FCA130',
};

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

export const LabelMethodTag = styled(RawTag)<{$method: string}>`
  ${({$method}) => `
    background-color: ${swaggerUIMethodsColors[$method]};
  `}

  font-weight: bold;
  color: ${Colors.grey2};
  border: none;
  padding: 1px 8px;
  margin: 0;
`;

export const LabelTag = styled(RawTag)`
  background-color: ${Colors.grey4};
  color: ${Colors.whitePure};
  margin: 0;
  font-size: 11px;
`;

export const TableOfContentsContainer = styled.div`
  margin-bottom: 30px;
`;

export const TableOfContentsLabel = styled.div<{$level: 'top' | 'path' | 'operation'}>`
  ${({$level}) => `
    margin-bottom: ${$level === 'operation' ? '14px' : '0px'};
  `}

  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TableOfContentsTitle = styled.span`
  font-size: 18px;
  color: ${Colors.whitePure};
`;
