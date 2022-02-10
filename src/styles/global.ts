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
    margin: 0;
    height: 100vh;
}
`;
