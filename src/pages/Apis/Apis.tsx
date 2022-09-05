import {Suspense} from 'react';
import {useTracking} from 'react-tracking';

import {ANALYTIC_TYPE, Events} from '@models/analytics';

import {useAppSelector} from '@redux/hooks';
import {useGetServicesQuery} from '@redux/services/enhancedApi';

import {ApisList, Dashboard} from '@components';
import {AddEnvoyFleetModal} from '@components/AddEnvoyFleetModal';
import {ApiCreatorModal, CanvasApiModal, FileApiModal} from '@components/ApiPublishModal';

const Apis: React.FC = () => {
  const {Track} = useTracking({page: Events.API_PAGE, type: ANALYTIC_TYPE.PAGE}, {dispatchOnMount: true});
  const isApiPublishModalVisible = useAppSelector(state => state.ui.apiPublishModal.isOpen);
  const isCanvasApiModalVisible = useAppSelector(state => state.ui.apiPublishModal.isCanvasApiModalOpen);
  const isFileApiModalVisible = useAppSelector(state => state.ui.apiPublishModal.isFileApiModalOpen);

  const isEnvoyFleetPublishModalVisible = useAppSelector(state => state.ui.envoyFleetModal.isOpen);

  const selectedApi = useAppSelector(state => state.main.selectedApi);

  useGetServicesQuery({});

  return (
    <Track>
      <Dashboard listElement={<ApisList />} selectedTableItem={selectedApi} />

      <Suspense fallback={null}>
        {isApiPublishModalVisible && !isCanvasApiModalVisible && !isFileApiModalVisible && <ApiCreatorModal />}
      </Suspense>
      <Suspense fallback={null}>
        {isCanvasApiModalVisible && !isEnvoyFleetPublishModalVisible && <CanvasApiModal />}
      </Suspense>
      <Suspense fallback={null}>
        {isFileApiModalVisible && !isEnvoyFleetPublishModalVisible && <FileApiModal />}
      </Suspense>
      <Suspense fallback={null}>{isEnvoyFleetPublishModalVisible && <AddEnvoyFleetModal />}</Suspense>
    </Track>
  );
};

export default Apis;
