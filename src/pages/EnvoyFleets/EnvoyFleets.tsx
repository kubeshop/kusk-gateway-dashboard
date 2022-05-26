import {Suspense, lazy} from 'react';

import {useAppSelector} from '@redux/hooks';

import {Dashboard, EnvoyFleetsList} from '@components';
import {AddEnvoyFleetModal} from '@components/AddEnvoyFleetModal';

const EnvoyFleetInfo = lazy(() => import('@components/EnvoyFleets/EnvoyFleetInfo/EnvoyFleetInfo'));

const EnvoyFleets: React.FC = () => {
  const selectedEnvoyFleet = useAppSelector(state => state.main.selectedEnvoyFleet);
  const isEnvoyFleetPublishModalVisible = useAppSelector(state => state.ui.envoyFleetModal.isOpen);

  return (
    <>
      <Dashboard
        listElement={<EnvoyFleetsList />}
        infoElement={<EnvoyFleetInfo />}
        selectedTableItem={selectedEnvoyFleet}
      />
      <Suspense fallback={null}>{isEnvoyFleetPublishModalVisible && <AddEnvoyFleetModal />}</Suspense>
    </>
  );
};

export default EnvoyFleets;
