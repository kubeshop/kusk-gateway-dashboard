import {useAppSelector} from '@redux/hooks';

import {Dashboard, StaticRoutesList} from '@components';

const StaticRoutes: React.FC = () => {
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);

  return <Dashboard listElement={<StaticRoutesList />} infoElement={null} selectedTableItem={selectedStaticRoute} />;
};

export default StaticRoutes;
