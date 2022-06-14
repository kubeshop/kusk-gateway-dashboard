import React, {Suspense, lazy} from 'react';

import {Modal, Skeleton} from 'antd';

import {MenuInfo} from 'rc-menu/lib/interface';

import {AlertEnum} from '@models/alert';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {selectApi} from '@redux/reducers/main';
import {setApiInfoActiveTab} from '@redux/reducers/ui';
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

const CRD = lazy(() => import('./CRD/CRD'));

const menuItems = [
  {
    label: '',
    icon: <InfoPanelSettingsIcon />,
    key: 'submenu',
    children: [{label: 'Delete', key: 'deleteResource', icon: <InfoPanelDeleteIcon />}],
  },
];

const TABS_ITEMS = [
  {key: 'crd', label: 'CRD'},
  {key: 'api-definition', label: 'API Definition'},
  {key: 'kusk-extensions', label: 'Kusk Extensions'},
  {key: 'public-api-definition', label: 'Public API Definition'},
];

const ApiDefinition = lazy(() => import('@components/ApiDefinition/ApiDefinition'));
const KuskExtensions = lazy(() => import('@components/KuskExtensions/KuskExtensions'));
const PublicApiDefinition = lazy(() => import('@components/PublicApiDefinition/PublicApiDefinition'));

const ApiInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.ui.apiInfoActiveTab);
  const selectedAPI = useAppSelector(state => state.main.selectedApi);
  const [deleteAPI] = useDeleteApiMutation();
  const onCloseHandler = () => {
    dispatch(selectApi(null));
    dispatch(setApiInfoActiveTab('crd'));
  };

  const onMenuItemClick = async (event: MenuInfo) => {
    if (event.key === 'deleteResource') {
      Modal.confirm({
        title: `Do you want to delete ${selectedAPI?.name} api?`,
        onOk: async () => {
          if (selectedAPI?.name) {
            try {
              await deleteAPI({namespace: selectedAPI?.namespace, name: selectedAPI.name}).unwrap();
              dispatch(
                setAlert({
                  title: 'API deleted successfully',
                  description: `${selectedAPI.name} was deleted successfully in ${selectedAPI.namespace} namespace!`,
                  type: AlertEnum.Success,
                })
              );

              dispatch(selectApi(null));
              dispatch(setApiInfoActiveTab('crd'));
            } catch (e) {
              dispatch(
                setAlert({
                  title: 'Deleting API was failed',
                  description: `Something went wrong!`,
                  type: AlertEnum.Error,
                })
              );
            }
          }
        },
      });
    }
  };

  return (
    <ContentWrapper $backgroundColor={Colors.grey4}>
      <InfoPaneContainer>
        <InfoTabs activeTabKey={activeTab} tabs={TABS_ITEMS} setActiveTab={setApiInfoActiveTab} />
        <Suspense fallback={<Skeleton />}>
          {activeTab === 'crd' && <CRD />}
          {activeTab === 'api-definition' && <ApiDefinition />}
          {activeTab === 'kusk-extensions' && <KuskExtensions />}
          {activeTab === 'public-api-definition' && <PublicApiDefinition />}
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

export default ApiInfo;
