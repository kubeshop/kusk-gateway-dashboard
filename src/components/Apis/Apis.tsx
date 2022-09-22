import {Suspense} from 'react';

import {useAppSelector} from '@redux/hooks';

import {AddEnvoyFleetModal} from '@components/AddEnvoyFleetModal';
import {ApiCreatorModal, CanvasApiModal, FileApiModal} from '@components/ApiPublishModal';

import {ApisList} from './ApisList';

const Apis: React.FC = () => {
  const isApiPublishModalVisible = useAppSelector(state => state.ui.apiPublishModal.isOpen);
  const isCanvasApiModalVisible = useAppSelector(state => state.ui.apiPublishModal.isCanvasApiModalOpen);
  const isFileApiModalVisible = useAppSelector(state => state.ui.apiPublishModal.isFileApiModalOpen);

  const isEnvoyFleetPublishModalVisible = useAppSelector(state => state.ui.envoyFleetModal.isOpen);

  return (
    <>
      <ApisList />

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
    </>
  );
};

export default Apis;
