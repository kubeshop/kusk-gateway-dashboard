import {createGlobalStyle} from 'styled-components';

import Colors from './colors';

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
    background-color: #151515;
    font-family: "PT Sans", "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body #root {
  height: 100%;
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
`;
