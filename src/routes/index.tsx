import {lazy} from 'react';
import {useRoutes} from 'react-router-dom';

import {ContentWrapper} from '@components/AntdCustom';

const Api = lazy(() => import('@pages/Api/Api'));

const Apis = lazy(() => import('@pages/Apis/Apis'));
const GlobalSettings = lazy(() => import('@pages/GlobalSettings/GlobalSettings'));

const Router = () => {
  let element = useRoutes([
    {path: '*', element: <ContentWrapper>Page not found!</ContentWrapper>},
    {path: '/', element: <Apis />},
    {path: '/:namespace/:api', element: <Api />},
    {path: '/settings', element: <GlobalSettings />},
  ]);

  return element;
};

export default Router;
