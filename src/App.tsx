import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import styled from 'styled-components';

import {SIDEBAR_WIDTH} from './constants/constants';

import {Sidebar} from './components';

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));

const AppContainer = styled.div`
  height: 100%;
  width: 100%;

  padding-left: ${SIDEBAR_WIDTH}px;
`;

const App = () => {
  return (
    <AppContainer>
      <Sidebar />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </AppContainer>
  );
};

export default App;
