import React, {Suspense, lazy} from 'react';

import {Skeleton} from 'antd';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';
import {setApiInfoActiveTab} from '@redux/reducers/ui';

import {InfoTabs} from '@components';
import {ContentWrapper, RightPaneInfoContainer} from '@components/AntdCustom';

import Colors from '@styles/colors';

import * as S from './styled';

const TABS_ITEMS = [
  {key: 'raw-api-spec', label: 'Raw API Spec'},
  {key: 'post-processed-api-spec', label: 'Post-Processed API Spec'},
  {key: 'kusk-extensions', label: 'Kusk Extensions'},
];

const KuskExtensions = lazy(() => import('@components/KuskExtensions/KuskExtensions'));
const PostProcessedApiSpec = lazy(() => import('@components/PostProcessedApiSpec/PostProcessedApiSpec'));
const RawApiSpec = lazy(() => import('@components/RawApiSpec/RawApiSpec'));

const ApiInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.ui.apiInfoActiveTab);

  const onCloseHandler = () => {
    dispatch(selectApi(null));
    dispatch(setApiInfoActiveTab('raw-api-spec'));
  };

  return (
    <ContentWrapper $backgroundColor={Colors.grey4}>
      <RightPaneInfoContainer>
        <InfoTabs activeTabKey={activeTab} tabs={TABS_ITEMS} setActiveTab={setApiInfoActiveTab} />

        <Suspense fallback={<Skeleton />}>
          {activeTab === 'raw-api-spec' && <RawApiSpec />}
          {activeTab === 'post-processed-api-spec' && <PostProcessedApiSpec />}
          {activeTab === 'kusk-extensions' && <KuskExtensions />}
        </Suspense>

        <S.CloseOutlined onClick={onCloseHandler} />
      </RightPaneInfoContainer>
    </ContentWrapper>
  );
};

export default ApiInfo;
