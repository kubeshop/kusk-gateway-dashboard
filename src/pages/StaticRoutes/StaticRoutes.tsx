import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {ServiceItem, useGetServices} from '@models/api';

import {useAppSelector} from '@redux/hooks';
import {setServices} from '@redux/reducers/main';

import {Dashboard, StaticRouteInfo, StaticRoutesList} from '@components';

const StaticRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);
  const {data, error, loading} = useGetServices({});

  useEffect(() => {
    let items: ServiceItem[] = [];

    if (loading) {
      dispatch(setServices({items, isLoading: true}));
      return;
    }

    if (error) {
      dispatch(setServices({error: error.message, items, isLoading: true}));
      return;
    }

    if (data) {
      items = data;
    }

    dispatch(setServices({items, isLoading: false}));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  return (
    <Dashboard
      listElement={<StaticRoutesList />}
      infoElement={<StaticRouteInfo />}
      selectedTableItem={selectedStaticRoute}
    />
  );
};

export default StaticRoutes;
