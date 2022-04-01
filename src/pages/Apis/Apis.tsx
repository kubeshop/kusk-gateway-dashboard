import {lazy} from 'react';

import {useAppSelector} from '@redux/hooks';

import {ApisList, Dashboard} from '@components';

const ApiInfo = lazy(() => import('@components/Apis/ApiInfo/ApiInfo'));

const Apis: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  return <Dashboard listElement={<ApisList />} infoElement={<ApiInfo />} selectedTableItem={selectedApi} />;
};

export default Apis;
