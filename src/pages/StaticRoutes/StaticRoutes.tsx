import {useAppSelector} from '@redux/hooks';
import {useGetServicesQuery} from '@redux/services/enhancedApi';

import {Dashboard, StaticRouteInfo, StaticRoutesList} from '@components';

const StaticRoutes: React.FC = () => {
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);
  useGetServicesQuery({});

  return (
    <Dashboard
      listElement={<StaticRoutesList />}
      infoElement={<StaticRouteInfo />}
      selectedTableItem={selectedStaticRoute}
    />
  );
};

export default StaticRoutes;
