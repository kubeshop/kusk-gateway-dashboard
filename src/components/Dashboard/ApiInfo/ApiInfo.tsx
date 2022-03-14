import React, {Suspense, lazy} from 'react';

import {Skeleton} from 'antd';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';
import {setApiInfoActiveTab} from '@redux/reducers/ui';

import * as S from './styled';

const KuskExtensions = lazy(() => import('@components/KuskExtensions/KuskExtensions'));
const PostProcessedApiSpec = lazy(() => import('@components/PostProcessedApiSpec/PostProcessedApiSpec'));
const RawApiSpec = lazy(() => import('@components/RawApiSpec/RawApiSpec'));

const ApiInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.ui.apiInfoActiveTab);

  const onCloseHandler = () => {
    dispatch(selectApi(''));
  };

  return (
    <S.ApiInfoContainer>
      <S.TabsContainer>
        <S.TabsLabel
          className={activeTab === 'raw-api-spec' ? 'selected-tab' : ''}
          onClick={() => dispatch(setApiInfoActiveTab('raw-api-spec'))}
        >
          Raw API Spec
        </S.TabsLabel>

        <S.TabsLabel
          className={activeTab === 'post-processed-api-spec' ? 'selected-tab' : ''}
          onClick={() => dispatch(setApiInfoActiveTab('post-processed-api-spec'))}
        >
          Post-Processed API Spec
        </S.TabsLabel>

        <S.TabsLabel
          className={activeTab === 'kusk-extensions' ? 'selected-tab' : ''}
          onClick={() => dispatch(setApiInfoActiveTab('kusk-extensions'))}
        >
          Kusk extensions
        </S.TabsLabel>
      </S.TabsContainer>

      <Suspense fallback={<Skeleton />}>
        {activeTab === 'raw-api-spec' && <RawApiSpec />}
        {activeTab === 'post-processed-api-spec' && <PostProcessedApiSpec />}
        {activeTab === 'kusk-extensions' && <KuskExtensions />}
      </Suspense>

      <S.CloseOutlined onClick={onCloseHandler} />
    </S.ApiInfoContainer>
  );
};

export default ApiInfo;
