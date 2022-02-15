import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import styled from 'styled-components';

import {SIDEBAR_WIDTH} from './constants/constants';

import {Sidebar} from './components';

import 'swagger-ui-react/swagger-ui.css';

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Settings = lazy(() => import('./components/Settings/Settings'));

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
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </AppContainer>
  );
};

export default App;
