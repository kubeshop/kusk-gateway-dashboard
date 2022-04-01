import {useAppSelector} from '@redux/hooks';

import {Dashboard} from '@components/Dashboard';

const StaticRoutes: React.FC = () => {
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);

  return <Dashboard listElement={null} infoElement={null} selectedTableItem={selectedStaticRoute} />;
};

export default StaticRoutes;
