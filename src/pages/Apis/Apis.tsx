import {Suspense, lazy} from 'react';
import {useTracking} from 'react-tracking';

import {ANALYTIC_TYPE, Events} from '@models/analytics';

import {useAppSelector} from '@redux/hooks';
import {useGetServicesQuery} from '@redux/services/enhancedApi';

import {ApisList, Dashboard} from '@components';

const ApiPublishModal = lazy(() => import('@components/ApiPublishModal/ApiPublishModal'));
const ApiInfo = lazy(() => import('@components/Apis/ApiInfo/ApiInfo'));

const Apis: React.FC = () => {
  const {Track} = useTracking({page: Events.API_PAGE, type: ANALYTIC_TYPE.PAGE}, {dispatchOnMount: true});
  const isApiPublishModalVisible = useAppSelector(state => state.ui.apiPublishModal.isOpen);
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  useGetServicesQuery({});

  return (
    <Track>
      <Dashboard listElement={<ApisList />} infoElement={<ApiInfo />} selectedTableItem={selectedApi} />

      <Suspense fallback={null}>{isApiPublishModalVisible && <ApiPublishModal />}</Suspense>
    </Track>
  );
};

export default Apis;
