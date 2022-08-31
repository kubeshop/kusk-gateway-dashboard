import {createGlobalStyle} from 'styled-components';

import Colors from './colors';

export const Shadows = {
  cardShadow: '0px 4px 12px rgba(0, 0, 0, 0.04);',
};

export const Transitions = {
  default: 'all 0.2s ease-in',
};

export const GlobalStyle = createGlobalStyle`
*, *:before, *:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

html {
  box-sizing: border-box;
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body #root {
  height: 100%;
}

.ant-form-item {
  margin-bottom: 0;
}

.ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
  display: none;
}

.ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
  display: inline-block;
  margin-left: 4px;
  color: ${Colors.rose500};
  font-size: 14px;
  font-family: SimSun, sans-serif;
  line-height: 1;
  content: '*';
}
.ant-form-hide-required-mark .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
  display: none;
}

.ant-select-selection-item {
    display: flex;
    align-items: center;
}

.custom-antd-table-selected-row {
  background: rgba(255, 255, 255, .1);
}

.ant-card-head-title {
  white-space: normal;
}
`;
