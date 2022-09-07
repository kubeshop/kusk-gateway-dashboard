import {Suspense, lazy} from 'react';

import {useAppSelector} from '@redux/hooks';

import {Settings} from '@components/Settings';

const AddEnvoyFleetModal = lazy(() => import('@components/AddEnvoyFleetModal/AddEnvoyFleetModal'));

const GlobalSettings: React.VFC = () => {
  const isEnvoyFleetPublishModalVisible = useAppSelector(state => state.ui.envoyFleetModal.isOpen);

  return (
    <>
      <Settings />
      <Suspense fallback={null}>{isEnvoyFleetPublishModalVisible && <AddEnvoyFleetModal />}</Suspense>
    </>
  );
};

export default GlobalSettings;
