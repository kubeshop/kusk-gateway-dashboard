import {Suspense, lazy} from 'react';

import {useAppSelector} from '@redux/hooks';

import {ApisList, Dashboard} from '@components';

const ApiDeployModal = lazy(() => import('@components/ApiDeployModal/ApiDeployModal'));
const ApiInfo = lazy(() => import('@components/Apis/ApiInfo/ApiInfo'));

const Apis: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);
  const isApiDeployModalVisible = useAppSelector(state => state.ui.apiDeployModal.isOpen);

  return (
    <>
      <Dashboard listElement={<ApisList />} infoElement={<ApiInfo />} selectedTableItem={selectedApi} />

      <Suspense fallback={null}>{isApiDeployModalVisible && <ApiDeployModal />}</Suspense>
    </>
  );
};

export default Apis;
