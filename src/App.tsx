import {Suspense} from 'react';

import {Skeleton} from 'antd';

import styled from 'styled-components';
import 'swagger-ui-react/swagger-ui.css';

import {SIDEBAR_WIDTH} from '@constants/constants';

import {NotificationBox, Sidebar} from '@components';

import Tracker from './analytics/AnalyticsContext';
import Router from './routes';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;

  padding-left: ${SIDEBAR_WIDTH}px;
`;

const App = () => {
  return (
    <Tracker>
      <AppContainer>
        <NotificationBox />
        <Sidebar />

        <Suspense fallback={<Skeleton />}>
          <Router />
        </Suspense>
      </AppContainer>
    </Tracker>
  );
};

export default App;
