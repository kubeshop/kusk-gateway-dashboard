import {useParams} from 'react-router-dom';

import {skipToken} from '@reduxjs/toolkit/query/react';

import {useAppSelector} from '@redux/hooks';
import {useGetApiQuery} from '@redux/services/enhancedApi';

import {ApiOpenSpec} from '@components/ApiOpenSpec';
import {ApiPaths} from '@components/ApiPaths';
import {ApiSettings} from '@components/ApiSettings';

import {ApiNotFound} from './Api404';
import {ApiSkelton} from './ApiSkelton';
import {Sidebar} from './Sidebar';

import * as S from './styled';

const ApiDetails = () => {
  const {namespace = '', name = '', ...params} = useParams();
  const section = params['*'];
  const selectedApi = useAppSelector(state => state.main.selectedApi);
  const {isLoading: isLoadingApi, isError} = useGetApiQuery(selectedApi ? skipToken : {namespace, name});

  const activeSection = section?.includes('settings')
    ? 'settings'
    : section?.includes('paths')
    ? 'paths'
    : 'openapiBrowser';

  if (isLoadingApi) {
    return <ApiSkelton />;
  }

  if (isError) {
    return <ApiNotFound />;
  }

  return (
    <S.Container>
      <Sidebar activeSection={activeSection} />
      <S.Content>
        {activeSection === 'openapiBrowser' && <ApiOpenSpec />}
        {activeSection === 'paths' && <ApiPaths />}
        {activeSection === 'settings' && <ApiSettings />}
      </S.Content>
    </S.Container>
  );
};

export default ApiDetails;
