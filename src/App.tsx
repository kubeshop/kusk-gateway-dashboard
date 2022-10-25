import {Suspense} from 'react';

import {Skeleton} from 'antd';

import styled from 'styled-components';
import 'swagger-ui-react/swagger-ui.css';

import {NotificationBox} from '@components';
import {ErrorAlertModal} from '@components/ErrorAlertModal';

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
        <Suspense fallback={<Skeleton />}>
          <Router />
        </Suspense>
      </AppContainer>
      <NotificationBox />
      <ErrorAlertModal />
    </>
  );
};

export default App;
