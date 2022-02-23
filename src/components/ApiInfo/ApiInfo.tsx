import React, {Suspense, useState} from 'react';

import {useAppDispatch} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';

import * as S from './styled';

const PostProcessedApiSpec = React.lazy(() => import('@components/PostProcessedApiSpec/PostProcessedApiSpec'));
const RawApiSpec = React.lazy(() => import('@components/RawApiSpec/RawApiSpec'));

const ApiInfo: React.FC = () => {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<'raw-api-spec' | 'post-processed-api-spec'>('raw-api-spec');

  const onCloseHandler = () => {
    dispatch(selectApi(''));
  };

  return (
    <S.ApiInfoContainer>
      <S.TabsContainer>
        <S.TabsLabel
          className={activeTab === 'raw-api-spec' ? 'selected-tab' : ''}
          onClick={() => setActiveTab('raw-api-spec')}
        >
          Raw API Spec
        </S.TabsLabel>
        <S.TabsLabel
          className={activeTab === 'post-processed-api-spec' ? 'selected-tab' : ''}
          onClick={() => setActiveTab('post-processed-api-spec')}
        >
          Post-Processed API Spec
        </S.TabsLabel>
      </S.TabsContainer>

      <Suspense fallback={null}>
        {activeTab === 'raw-api-spec' && <RawApiSpec />}
        {activeTab === 'post-processed-api-spec' && <PostProcessedApiSpec />}
      </Suspense>

      <S.CloseOutlined onClick={onCloseHandler} />
    </S.ApiInfoContainer>
  );
};

export default ApiInfo;
