import {lazy} from 'react';
import {useRoutes} from 'react-router-dom';

import {ContentWrapper} from '@components/AntdCustom';

const Api = lazy(() => import('@pages/Api/Api'));

const Apis = lazy(() => import('@pages/Apis/Apis'));
const GlobalSettings = lazy(() => import('@pages/GlobalSettings/GlobalSettings'));
const StaticRoute = lazy(() => import('@pages/StaticRoute/StaticRoute'));

const Router = () => {
  let element = useRoutes([
    {path: '/settings/*', element: <GlobalSettings />},
    {path: '/staticroute/:namespace/:name/*', element: <StaticRoute />},
    {path: '/:namespace/:name/*', element: <Api />},
    {path: '/', element: <Apis />},
    {path: '*', element: <ContentWrapper>Page not found!</ContentWrapper>},
  ]);

  return element;
};

export default Router;
