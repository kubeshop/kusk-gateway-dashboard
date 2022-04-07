import {Suspense, lazy} from 'react';

import {useAppSelector} from '@redux/hooks';

import {ApisList, Dashboard} from '@components';

const ApiDeployModal = lazy(() => import('@components/ApiDeployModal/ApiDeployModal'));
const ApiInfo = lazy(() => import('@components/Apis/ApiInfo/ApiInfo'));
const EnvoyFleetInfoModal = lazy(() => import('@components/EnvoyFleetInfoModal/EnvoyFleetInfoModal'));

const Apis: React.FC = () => {
  const isApiDeployModalVisible = useAppSelector(state => state.ui.apiDeployModal.isOpen);
  const isEnvoyFleetInfoModalVisible = useAppSelector(state => state.ui.envoyFleetModal.envoyFleet);
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  return (
    <>
      <Dashboard listElement={<ApisList />} infoElement={<ApiInfo />} selectedTableItem={selectedApi} />

      <Suspense fallback={null}>
        {isApiDeployModalVisible && <ApiDeployModal />} {isEnvoyFleetInfoModalVisible && <EnvoyFleetInfoModal />}
      </Suspense>
    </>
  );
};

export default Apis;
