import {Suspense} from 'react';

import {Skeleton} from 'antd';

import styled from 'styled-components';
import 'swagger-ui-react/swagger-ui.css';

import {SIDEBAR_WIDTH} from '@constants/constants';

import {NotificationBox, Sidebar} from '@components';
import {Header} from '@components/Header';

import Tracker from './analytics/AnalyticsContext';
import Router from './routes';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: ${SIDEBAR_WIDTH}px 1fr;
  grid-template-rows: 64px auto;
  grid-template-areas: 'nav nav' 'sidebar main';
  grid-gap: 0;
`;

const App = () => {
  return (
    <Tracker>
      <AppContainer>
        <Header />
        <Sidebar />
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
