import {Skeleton} from 'antd';
import SwaggerUI from 'swagger-ui-react';

import {useAppSelector} from 'src/redux/hooks';

import {useGetApiOpenApiSpec} from '../../models/api';

import * as S from './styled';

import openApiSpec from '../../constants/openApiSpec.json';

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
