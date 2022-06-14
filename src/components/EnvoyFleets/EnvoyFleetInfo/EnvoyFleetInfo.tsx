import {Suspense, lazy} from 'react';

import {Modal, Skeleton} from 'antd';

import {MenuInfo} from 'rc-menu/lib/interface';

import {AlertEnum} from '@models/alert';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {selectEnvoyFleet} from '@redux/reducers/main';
import {setEnvoyFleetInfoActiveTab} from '@redux/reducers/ui';
import {useDeleteApiMutation} from '@redux/services/enhancedApi';

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

const APIs = lazy(() => import('./APIs/APIs'));
const CRD = lazy(() => import('./CRD/CRD'));
const StaticRoutes = lazy(() => import('./StaticRoutes/StaticRoutes'));

const TABS_ITEMS = [
  {key: 'crd', label: 'CRD'},
  {key: 'apis', label: 'APIs'},
  {key: 'static-routes', label: 'Static Routes'},
];

const menuItems = [
  {
    label: '',
    icon: <InfoPanelSettingsIcon />,
    key: 'submenu',
    children: [{label: 'Delete', key: 'deleteResource', icon: <InfoPanelDeleteIcon />}],
  },
];

const EnvoyFleetInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.ui.envoyFleetInfoActiveTab);
  const selectedFleet = useAppSelector(state => state.main.selectedEnvoyFleet);
  const [deleteFleet] = useDeleteApiMutation();
  const onCloseHandler = () => {
    dispatch(selectEnvoyFleet(null));
    dispatch(setEnvoyFleetInfoActiveTab('crd'));
  };

  const onMenuItemClick = async (event: MenuInfo) => {
    if (event.key === 'deleteResource') {
      if (selectedFleet?.name) {
        Modal.confirm({
          title: `Do you want to delete ${selectedFleet.name} envoy fleet?`,
          onOk: async () => {
            try {
              await deleteFleet({namespace: selectedFleet?.namespace || '', name: selectedFleet.name}).unwrap();
              dispatch(
                setAlert({
                  title: 'Envoy fleet deleted successfully',
                  description: `${selectedFleet.name} was deleted successfully in ${selectedFleet.namespace} namespace!`,
                  type: AlertEnum.Success,
                })
              );
              dispatch(selectEnvoyFleet(null));
              dispatch(setEnvoyFleetInfoActiveTab('crd'));
            } catch (e) {
              dispatch(
                setAlert({
                  title: 'Deleting Envoy fleet was failed',
                  description: `Something went wrong!`,
                  type: AlertEnum.Error,
                })
              );
            }
          },
        });
      }
    }
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

export default EnvoyFleetInfo;
