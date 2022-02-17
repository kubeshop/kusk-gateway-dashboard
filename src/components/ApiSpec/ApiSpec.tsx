import {Skeleton} from 'antd';
import SwaggerUI from 'swagger-ui-react';

import openApiSpec from '@constants/kuskOpenApiSpec.json';
import {useGetApiOpenApiSpec} from '@models/api';
import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

const ApiSpec: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetApiOpenApiSpec({apiId: selectedApi});

  return (
    <S.ApiSpecContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <S.ErrorLabel>{error.message}</S.ErrorLabel>
      ) : (
        data && <SwaggerUI spec={openApiSpec} />
      )}
    </S.ApiSpecContainer>
  );
};

export default ApiSpec;
