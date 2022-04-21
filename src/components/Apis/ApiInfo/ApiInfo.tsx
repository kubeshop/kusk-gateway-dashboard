import React, {Suspense, lazy} from 'react';

import {Skeleton} from 'antd';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';
import {setApiInfoActiveTab} from '@redux/reducers/ui';

import {InfoTabs} from '@components';
import {ContentWrapper, InfoPaneCloseIcon, InfoPaneContainer} from '@components/AntdCustom';

import Colors from '@styles/colors';

const TABS_ITEMS = [
  {key: 'api-definition', label: 'API Definition'},
  {key: 'kusk-extensions', label: 'Kusk Extensions'},
  {key: 'public-api-definition', label: 'Public API Definition'},
];

const KuskExtensions = lazy(() => import('@components/KuskExtensions/KuskExtensions'));
const PostProcessedApiSpec = lazy(() => import('@components/PostProcessedApiSpec/PostProcessedApiSpec'));
const RawApiSpec = lazy(() => import('@components/RawApiSpec/RawApiSpec'));

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
          {activeTab === 'api-definition' && <RawApiSpec />}
          {activeTab === 'kusk-extensions' && <KuskExtensions />}
          {activeTab === 'public-api-definition' && <PostProcessedApiSpec />}
        </Suspense>

        <InfoPaneCloseIcon onClick={onCloseHandler} />
      </InfoPaneContainer>
    </ContentWrapper>
  );
};

export default ApiInfo;
