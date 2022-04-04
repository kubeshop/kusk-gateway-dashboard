import {useAppSelector} from '@redux/hooks';

import {Dashboard, StaticRouteInfo, StaticRoutesList} from '@components';

const StaticRoutes: React.FC = () => {
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);

  return (
    <Dashboard
      listElement={<StaticRoutesList />}
      infoElement={<StaticRouteInfo />}
      selectedTableItem={selectedStaticRoute}
    />
  );
};

export default StaticRoutes;
