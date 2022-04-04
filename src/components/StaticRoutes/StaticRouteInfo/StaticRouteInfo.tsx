import {Suspense, lazy} from 'react';

import {Skeleton} from 'antd';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectStaticRoute} from '@redux/reducers/main';
import {setStaticRouteInfoActiveTab} from '@redux/reducers/ui';

import {InfoTabs} from '@components';
import {ContentWrapper, RightPaneInfoContainer} from '@components/AntdCustom';

import Colors from '@styles/colors';

import * as S from './styled';

const CRD = lazy(() => import('./CRD/CRD'));

const TABS_ITEMS = [{key: 'crd', label: 'CRD'}];

const StaticRouteInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.ui.staticRouteInfoActiveTab);

  const onCloseHandler = () => {
    dispatch(selectStaticRoute(null));
    dispatch(setStaticRouteInfoActiveTab('crd'));
  };

  return (
    <ContentWrapper $backgroundColor={Colors.grey4}>
      <RightPaneInfoContainer>
        <InfoTabs activeTabKey={activeTab} tabs={TABS_ITEMS} setActiveTab={setStaticRouteInfoActiveTab} />

        <Suspense fallback={<Skeleton />}>{activeTab === 'crd' && <CRD />}</Suspense>

        <S.CloseOutlined onClick={onCloseHandler} />
      </RightPaneInfoContainer>
    </ContentWrapper>
  );
};

export default StaticRouteInfo;
