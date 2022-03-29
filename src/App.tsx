import {Suspense, lazy} from 'react';
import {Route, Routes} from 'react-router-dom';

import {Skeleton} from 'antd';

import styled from 'styled-components';
import 'swagger-ui-react/swagger-ui.css';

import {SIDEBAR_WIDTH} from '@constants/constants';

import {Sidebar} from '@components/Sidebar';

const Dashboard = lazy(() => import('@pages/Dashboard/Dashboard'));
const EnvoyFleets = lazy(() => import('@pages/EnvoyFleets/EnvoyFleets'));
const Settings = lazy(() => import('@pages/Settings/Settings'));

const AppContainer = styled.div`
  height: 100%;
  width: 100%;

  padding-left: ${SIDEBAR_WIDTH}px;
`;

const App = () => {
  return (
    <AppContainer>
      <Sidebar />

      <Suspense fallback={<Skeleton />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/envoy-fleets" element={<EnvoyFleets />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </AppContainer>
  );
};

export default App;
