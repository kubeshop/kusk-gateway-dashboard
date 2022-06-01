import {Suspense, lazy} from 'react';

import {useAppSelector} from '@redux/hooks';
import {useGetServicesQuery} from '@redux/services/enhancedApi';

import {ApisList, Dashboard} from '@components';

const ApiPublishModal = lazy(() => import('@components/ApiPublishModal/ApiPublishModal'));
const ApiInfo = lazy(() => import('@components/Apis/ApiInfo/ApiInfo'));

const Apis: React.FC = () => {
  const isApiPublishModalVisible = useAppSelector(state => state.ui.apiPublishModal.isOpen);
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  useGetServicesQuery({});

  return (
    <>
      <Dashboard listElement={<ApisList />} infoElement={<ApiInfo />} selectedTableItem={selectedApi} />

      <Suspense fallback={null}>{isApiPublishModalVisible && <ApiPublishModal />}</Suspense>
    </>
  );
};

export default Apis;
