import {Suspense, lazy} from 'react';

import {useAppSelector} from '@redux/hooks';

import {Settings} from '@components/Settings';

const AddEnvoyFleetModal = lazy(() => import('@components/AddEnvoyFleetModal/AddEnvoyFleetModal'));
const AddStaticRouteModal = lazy(() => import('@components/AddStaticRouteModal/AddStaticRouteModal'));

const GlobalSettings: React.VFC = () => {
  const isEnvoyFleetPublishModalVisible = useAppSelector(state => state.ui.envoyFleetModal.isOpen);
  const isStaticRouteModalVisible = useAppSelector(state => state.ui.staticRouteModal.isOpen);

  return (
    <>
      <Settings />
      <Suspense fallback={null}>{isEnvoyFleetPublishModalVisible && <AddEnvoyFleetModal />}</Suspense>
      <Suspense fallback={null}>{isStaticRouteModalVisible && <AddStaticRouteModal />}</Suspense>
    </>
  );
};

export default GlobalSettings;
