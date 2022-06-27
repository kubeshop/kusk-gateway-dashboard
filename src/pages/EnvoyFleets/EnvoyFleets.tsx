import {Suspense, lazy} from 'react';
import {useTracking} from 'react-tracking';

import {ANALYTIC_TYPE, Events} from '@models/analytics';

import {useAppSelector} from '@redux/hooks';

import {Dashboard, EnvoyFleetsList} from '@components';
import {AddEnvoyFleetModal} from '@components/AddEnvoyFleetModal';

const EnvoyFleetInfo = lazy(() => import('@components/EnvoyFleets/EnvoyFleetInfo/EnvoyFleetInfo'));

const EnvoyFleets: React.FC = () => {
  const {Track} = useTracking({page: Events.ENVOY_FLEET_PAGE, type: ANALYTIC_TYPE.PAGE}, {dispatchOnMount: true});
  const selectedEnvoyFleet = useAppSelector(state => state.main.selectedEnvoyFleet);
  const isEnvoyFleetPublishModalVisible = useAppSelector(state => state.ui.envoyFleetModal.isOpen);

  return (
    <Track>
      <Dashboard
        listElement={<EnvoyFleetsList />}
        infoElement={<EnvoyFleetInfo />}
        selectedTableItem={selectedEnvoyFleet}
      />
      <Suspense fallback={null}>{isEnvoyFleetPublishModalVisible && <AddEnvoyFleetModal />}</Suspense>
    </Track>
  );
};

export default EnvoyFleets;
