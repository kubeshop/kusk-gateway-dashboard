import {lazy} from 'react';
import {useRoutes} from 'react-router-dom';

const Api = lazy(() => import('@pages/Api/Api'));

const Home = lazy(() => import('@pages/Home/Home'));
const StaticRoute = lazy(() => import('@pages/StaticRoute/StaticRoute'));

const Router = () => {
  let element = useRoutes([
    {path: '/staticroute/:namespace/:name/*', element: <StaticRoute />},
    {path: '/api/:namespace/:name/*', element: <Api />},
    {path: '/*', element: <Home />},
  ]);

  return element;
};

export default Router;
