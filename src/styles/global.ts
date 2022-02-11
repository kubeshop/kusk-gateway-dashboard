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

    font-family: "PT Sans", "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body #root {
  height: 100%
}
`;
