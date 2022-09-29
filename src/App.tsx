import {Suspense} from 'react';

import styled from 'styled-components';
import 'swagger-ui-react/swagger-ui.css';

import {NotificationBox} from '@components';

import Router from './routes';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

const App = () => {
  return (
    <>
      <AppContainer>
        <Suspense fallback={null}>
          <Router />
        </Suspense>
      </AppContainer>
      <NotificationBox />
    </>
  );
};

export default App;
