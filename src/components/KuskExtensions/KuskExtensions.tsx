import {Skeleton} from 'antd';

import {useGetRawOpenApiSpec} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

const KuskExtensions: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, loading, error} = useGetRawOpenApiSpec({apiId: selectedApi});

  return (
    <S.KuskExtensionsContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <S.ErrorLabel>{error.message}</S.ErrorLabel>
      ) : (
        data && <div>Kusk Extensions</div>
      )}
    </S.KuskExtensionsContainer>
  );
};

export default KuskExtensions;
