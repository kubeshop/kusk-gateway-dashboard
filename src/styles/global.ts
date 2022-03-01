import {createGlobalStyle} from 'styled-components';

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

.ant-tooltip-inner {
  background: #434343;
}

.ant-tooltip-arrow-content{
    background-color: #434343 !important;
}
`;
