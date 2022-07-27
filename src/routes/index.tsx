import {lazy} from 'react';
import {useRoutes} from 'react-router-dom';

import {Api} from '@pages/Api';

import {ContentWrapper} from '@components/AntdCustom';

const Apis = lazy(() => import('@pages/Apis/Apis'));
const Settings = lazy(() => import('@pages/Settings/Settings'));

const Router = () => {
  let element = useRoutes([
    {path: '*', element: <ContentWrapper>Page not found!</ContentWrapper>},
    {path: '/', element: <Apis />},
    {path: ':api', element: <Api />},
    {path: '/settings', element: <Settings />},
  ]);

  return element;
};

export default Router;
