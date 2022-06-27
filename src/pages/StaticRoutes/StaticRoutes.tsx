import {useTracking} from 'react-tracking';

import {ANALYTIC_TYPE, Events} from '@models/analytics';

import {useAppSelector} from '@redux/hooks';
import {useGetServicesQuery} from '@redux/services/enhancedApi';

import {Dashboard, StaticRouteInfo, StaticRoutesList} from '@components';

const StaticRoutes: React.FC = () => {
  const {Track} = useTracking({page: Events.STATIC_ROUTES_PAGE, type: ANALYTIC_TYPE.PAGE}, {dispatchOnMount: true});
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);
  useGetServicesQuery({});

  return (
    <Track>
      <Dashboard
        listElement={<StaticRoutesList />}
        infoElement={<StaticRouteInfo />}
        selectedTableItem={selectedStaticRoute}
      />
    </Track>
  );
};

export default StaticRoutes;
