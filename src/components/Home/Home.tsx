import {Suspense, lazy} from 'react';
import {useParams} from 'react-router-dom';

import {Header} from './Header';

const Apis = lazy(() => import('@components/Apis/Apis'));
const StaticRoutes = lazy(() => import('@components/StaticRoutes/StaticRoutes'));
const Settings = lazy(() => import('@components/Settings/Settings'));

const Home = () => {
  const {'*': path = '/apis'} = useParams();
  const [section] = path?.length > 0 ? path?.split('/') : ['apis'];

  return (
    <>
      <Header />
      <Suspense fallback={null}>{section === 'apis' && <Apis />}</Suspense>
      <Suspense fallback={null}>{section === 'staticroutes' && <StaticRoutes />}</Suspense>
      <Suspense fallback={null}>{section === 'settings' && <Settings />}</Suspense>
    </>
  );
};
export default Home;
