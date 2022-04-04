import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectStaticRoute} from '@redux/reducers/main';
import {setStaticRouteInfoActiveTab} from '@redux/reducers/ui';

import {InfoTabs} from '@components';

import * as S from './styled';

const TABS_ITEMS = [{key: 'crd', label: 'CRD'}];

const StaticRouteInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.ui.staticRouteInfoActiveTab);

  const onCloseHandler = () => {
    dispatch(selectStaticRoute(null));
    dispatch(setStaticRouteInfoActiveTab('crd'));
  };

  return (
    <S.StaticRouteInfoContainer>
      <InfoTabs activeTabKey={activeTab} tabs={TABS_ITEMS} setActiveTab={setStaticRouteInfoActiveTab} />

      <S.CloseOutlined onClick={onCloseHandler} />
    </S.StaticRouteInfoContainer>
  );
};

export default StaticRouteInfo;
