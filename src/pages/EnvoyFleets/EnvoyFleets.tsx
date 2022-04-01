import {lazy} from 'react';

import {useAppSelector} from '@redux/hooks';

import {Dashboard, EnvoyFleetsList} from '@components';

const EnvoyFleetInfo = lazy(() => import('@components/EnvoyFleets/EnvoyFleetInfo/EnvoyFleetInfo'));

const EnvoyFleets: React.FC = () => {
  const selectedEnvoyFleet = useAppSelector(state => state.main.selectedEnvoyFleet);

  return (
    <Dashboard
      listElement={<EnvoyFleetsList />}
      infoElement={<EnvoyFleetInfo />}
      selectedTableItem={selectedEnvoyFleet}
    />
  );
};

export default EnvoyFleets;
