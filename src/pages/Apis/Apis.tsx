import {Suspense, lazy, useEffect} from 'react';

import {ServiceItem, useGetServices} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setServices} from '@redux/reducers/main';

import {ApisList, Dashboard} from '@components';

const ApiDeployModal = lazy(() => import('@components/ApiDeployModal/ApiDeployModal'));
const ApiInfo = lazy(() => import('@components/Apis/ApiInfo/ApiInfo'));
const EnvoyFleetInfoModal = lazy(() => import('@components/EnvoyFleetInfoModal/EnvoyFleetInfoModal'));

const Apis: React.FC = () => {
  const dispatch = useAppDispatch();
  const apis = useAppSelector(state => state.main.apis);
  const isApiDeployModalVisible = useAppSelector(state => state.ui.apiDeployModal.isOpen);
  const isEnvoyFleetInfoModalVisible = useAppSelector(state => state.ui.envoyFleetModal.envoyFleet);
  const selectedApi = useAppSelector(state => state.main.selectedApi);

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
  }, [apis, data, error, loading]);

  return (
    <>
      <Dashboard listElement={<ApisList />} infoElement={<ApiInfo />} selectedTableItem={selectedApi} />

      <Suspense fallback={null}>
        {isApiDeployModalVisible && <ApiDeployModal />} {isEnvoyFleetInfoModalVisible && <EnvoyFleetInfoModal />}
      </Suspense>
    </>
  );
};

export default Apis;
