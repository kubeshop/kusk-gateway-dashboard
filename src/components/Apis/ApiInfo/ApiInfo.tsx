import React, {Suspense, lazy} from 'react';

import {Skeleton} from 'antd';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';
import {setApiInfoActiveTab} from '@redux/reducers/ui';

import {InfoTabs} from '@components';
import {ContentWrapper, InfoPaneCloseIcon, InfoPaneContainer} from '@components/AntdCustom';

import Colors from '@styles/colors';

const CRD = lazy(() => import('./CRD/CRD'));

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

  const onCloseHandler = () => {
    dispatch(selectApi(null));
    dispatch(setApiInfoActiveTab('api-definition'));
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

        <InfoPaneCloseIcon onClick={onCloseHandler} />
      </InfoPaneContainer>
    </ContentWrapper>
  );
};

export default ApiInfo;
