import {lazy} from 'react';
import {useRoutes} from 'react-router-dom';

const Dashboard = lazy(() => import('@pages/Dashboard/Dashboard'));
const EnvoyFleets = lazy(() => import('@pages/EnvoyFleets/EnvoyFleets'));
const Settings = lazy(() => import('@pages/Settings/Settings'));
const StaticRoutes = lazy(() => import('@pages/StaticRoutes/StaticRoutes'));

const Router = () => {
  let element = useRoutes([
    {path: '/', element: <Dashboard />},
    {path: '/envoy-fleets', element: <EnvoyFleets />},
    {path: '/settings', element: <Settings />},
    {path: '/static-routes', element: <StaticRoutes />},
  ]);

  return element;
};

export default Router;
