import {useAppSelector} from '@redux/hooks';
import {useGetServicesQuery} from '@redux/services/enhancedApi';

import {Dashboard, StaticRoutesList} from '@components';

const StaticRoutes: React.FC = () => {
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);
  useGetServicesQuery({});

  return (
    <>
      <Dashboard listElement={<StaticRoutesList />} selectedTableItem={selectedStaticRoute} />
    </>
  );
};

export default StaticRoutes;
