import {Suspense, lazy} from 'react';

import {Skeleton} from 'antd';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectEnvoyFleet} from '@redux/reducers/main';
import {setEnvoyFleetInfoActiveTab} from '@redux/reducers/ui';

import {InfoTabs} from '@components';
import {ContentWrapper, InfoPaneCloseIcon, InfoPaneContainer} from '@components/AntdCustom';

import Colors from '@styles/colors';

const APIs = lazy(() => import('./APIs/APIs'));
const CRD = lazy(() => import('./CRD/CRD'));
const StaticRoutes = lazy(() => import('./StaticRoutes/StaticRoutes'));

const TABS_ITEMS = [
  {key: 'crd', label: 'CRD'},
  {key: 'apis', label: 'APIs'},
  {key: 'static-routes', label: 'Static Routes'},
];

const EnvoyFleetInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.ui.envoyFleetInfoActiveTab);

  const onCloseHandler = () => {
    dispatch(selectEnvoyFleet(null));
    dispatch(setEnvoyFleetInfoActiveTab('crd'));
  };

  return (
    <ContentWrapper $backgroundColor={Colors.grey4}>
      <InfoPaneContainer>
        <InfoTabs activeTabKey={activeTab} tabs={TABS_ITEMS} setActiveTab={setEnvoyFleetInfoActiveTab} />

        <Suspense fallback={<Skeleton />}>
          {activeTab === 'crd' && <CRD />}
          {activeTab === 'apis' && <APIs />}
          {activeTab === 'static-routes' && <StaticRoutes />}
        </Suspense>

        <InfoPaneCloseIcon onClick={onCloseHandler} />
      </InfoPaneContainer>
    </ContentWrapper>
  );
};

export default EnvoyFleetInfo;
