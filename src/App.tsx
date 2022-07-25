import {Suspense} from 'react';

import {Skeleton} from 'antd';

import styled from 'styled-components';
import 'swagger-ui-react/swagger-ui.css';

import {NotificationBox} from '@components';
import {Header} from '@components/Header';

import Tracker from './analytics/AnalyticsContext';
import Router from './routes';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const App = () => {
  return (
    <Tracker>
      <AppContainer>
        <Header />
        <div style={{gridArea: 'main'}}>
          <Suspense fallback={<Skeleton />}>
            <Router />
          </Suspense>
        </div>
      </AppContainer>
      <NotificationBox />
    </Tracker>
  );
};

export default App;
