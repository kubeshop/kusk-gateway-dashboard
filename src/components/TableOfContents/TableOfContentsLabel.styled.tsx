import {Tag as RawTag} from 'antd';

import {ApiOutlined as RawApiOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';
import {Transitions} from '@styles/global';

const swaggerUIMethodsColors: {[method: string]: string} = {
  delete: Colors.pink500,
  get: Colors.sky500,
  head: Colors.violet500,
  options: Colors.blue500,
  patch: Colors.emerald500,
  post: Colors.lime500,
  put: Colors.yellow500,
};
const swaggerUIMethodsTextColors: {[method: string]: string} = {
  delete: Colors.pink700,
  get: Colors.sky700,
  head: Colors.violet700,
  options: Colors.blue700,
  patch: Colors.emerald700,
  post: Colors.lime700,
  put: Colors.yellow700,
};
const swaggerUIMethodsBackgroundColors: {[method: string]: string} = {
  delete: Colors.pink100,
  get: Colors.sky100,
  head: Colors.violet100,
  options: Colors.blue100,
  patch: Colors.emerald100,
  post: Colors.lime100,
  put: Colors.yellow100,
};

export const ApiOutlined = styled(RawApiOutlined)`
  font-size: 18px;

  transition: ${Transitions.default};
`;

export const Container = styled.div<{$level: 'top' | 'path' | 'operation'}>`
  ${({$level}) => `
    margin-bottom: ${$level === 'operation' ? '14px' : '0px'};
  `}

  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LabelMethodTag = styled(RawTag)<{$deprecated: boolean; $method: string}>`
  ${({$deprecated, $method}) => `
    background-color: ${$deprecated ? '#EBEBEB' : swaggerUIMethodsBackgroundColors[$method]};
    border: 1px solid ${$deprecated ? '#EBEBEB' : swaggerUIMethodsColors[$method]};
    color: ${$deprecated ? '#000' : swaggerUIMethodsTextColors[$method]};
    opacity: ${$deprecated ? '0.6' : '1'};
  `}
  padding: 4px 4px;
  margin: 0;
`;

export const LabelPath = styled.span<{$deprecated: boolean}>`
  ${({$deprecated}) => `
    text-decoration: ${$deprecated ? 'line-through' : ''};
    opacity: ${$deprecated ? '0.65' : '1'};
  `}
`;

export const LabelTag = styled(RawTag)`
  background-color: ${Colors.grey4};
  color: ${Colors.whitePure};
  margin: 0;
  font-size: 11px;
`;
