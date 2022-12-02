import {useParams} from 'react-router-dom';

import {useAppSelector} from '@redux/hooks';
import {useGetApiQuery} from '@redux/services/enhancedApi';

import {Header} from '@components/Header';

import {ApiNotFound} from './Api404';
import {ApiLogging} from './ApiLogging';
import {ApiOpenSpec} from './ApiOpenSpec';
import {ApiPaths} from './ApiPaths';
import {ApiSettings} from './ApiSettings';
import {ApiSkelton} from './ApiSkelton';
import {Sidebar} from './Sidebar';

import * as S from './styled';

const ApiDetails = () => {
  const {namespace = '', name = '', '*': section} = useParams();
  const selectedApi = useAppSelector(state => state.main.selectedApi);
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const {isLoading: isLoadingApi, isError} = useGetApiQuery({
    namespace: selectedApi?.namespace || namespace,
    name: selectedApi?.name || name,
  });

  const activeSection = section?.includes('settings')
    ? 'settings'
    : section?.includes('logs')
    ? 'logs'
    : section?.includes('paths')
    ? 'paths'
    : 'openapiBrowser';

  if (isError) {
    return <ApiNotFound />;
  }

  return (
    <S.Wrapper>
      <Header />
      {isLoadingApi || !selectedAPIOpenSpec ? (
        <ApiSkelton />
      ) : (
        <S.Container>
          <Sidebar activeSection={activeSection} />
          <S.Content>
            {activeSection === 'openapiBrowser' && <ApiOpenSpec />}
            {activeSection === 'paths' && <ApiPaths />}
            {activeSection === 'logs' && <ApiLogging />}
            {activeSection === 'settings' && <ApiSettings />}
          </S.Content>
        </S.Container>
      )}
    </S.Wrapper>
  );
};

export default ApiDetails;
