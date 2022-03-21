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

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
