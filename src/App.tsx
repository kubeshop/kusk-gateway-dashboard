import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import styled from 'styled-components';

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const App = () => {
  return (
    <AppContainer>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </AppContainer>
  );
};

export default App;
