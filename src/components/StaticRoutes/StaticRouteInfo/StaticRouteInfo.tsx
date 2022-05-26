import {Suspense, lazy} from 'react';

import {Skeleton} from 'antd';

import {MenuInfo} from 'rc-menu/lib/interface';

import {AlertEnum} from '@models/alert';
import {useDeleteStaticRoute} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {selectStaticRoute} from '@redux/reducers/main';
import {setStaticRouteInfoActiveTab} from '@redux/reducers/ui';

import {InfoTabs} from '@components';
import {
  ContentWrapper,
  InfoActionMenu,
  InfoPaneCloseIcon,
  InfoPaneContainer,
  InfoPanelActions,
  InfoPanelDeleteIcon,
  InfoPanelSettingsIcon,
} from '@components/AntdCustom';

import Colors from '@styles/colors';

const CRD = lazy(() => import('./CRD/CRD'));

const TABS_ITEMS = [{key: 'crd', label: 'CRD'}];

const menuItems = [
  {
    label: '',
    icon: <InfoPanelSettingsIcon />,
    key: 'submenu',
    children: [{label: 'Delete', key: 'deleteResource', icon: <InfoPanelDeleteIcon />}],
  },
];

const StaticRouteInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.ui.staticRouteInfoActiveTab);
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);
  const {mutate: deleteStaticRoute} = useDeleteStaticRoute({namespace: selectedStaticRoute?.namespace || ''});

  const onCloseHandler = () => {
    dispatch(selectStaticRoute(null));
    dispatch(setStaticRouteInfoActiveTab('crd'));
  };

  const onMenuItemClick = async (event: MenuInfo) => {
    if (event.key === 'deleteResource') {
      if (selectedStaticRoute?.name) {
        try {
          await deleteStaticRoute(selectedStaticRoute.name);
          dispatch(
            setAlert({
              title: 'Static Route deleted successfully',
              description: `${selectedStaticRoute.name} was deleted successfully in ${selectedStaticRoute.namespace} namespace!`,
              type: AlertEnum.Success,
            })
          );
          dispatch(selectStaticRoute(null));
          dispatch(setStaticRouteInfoActiveTab('crd'));
        } catch (e) {
          dispatch(
            setAlert({
              title: 'Deleting Static Route was failed',
              description: `Something went wrong!`,
              type: AlertEnum.Error,
            })
          );
        }
      }
    }
  };

  return (
    <ContentWrapper $backgroundColor={Colors.grey4}>
      <InfoPaneContainer>
        <InfoTabs activeTabKey={activeTab} tabs={TABS_ITEMS} setActiveTab={setStaticRouteInfoActiveTab} />

        <Suspense fallback={<Skeleton />}>{activeTab === 'crd' && <CRD />}</Suspense>
        <InfoPanelActions>
          <InfoActionMenu
            selectable={false}
            mode="horizontal"
            theme="dark"
            items={menuItems}
            onClick={onMenuItemClick}
          />

          <InfoPaneCloseIcon onClick={onCloseHandler} />
        </InfoPanelActions>
      </InfoPaneContainer>
    </ContentWrapper>
  );
};

export default StaticRouteInfo;
