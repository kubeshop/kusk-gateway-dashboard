import {Skeleton} from 'antd';
import SwaggerUI from 'swagger-ui-react';

import {useAppSelector} from 'src/redux/hooks';

import {useGetApiOpenApiSpec} from '../../models/api';

import * as S from './styled';

const ApiSpec: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetApiOpenApiSpec({apiId: selectedApi});

  return loading ? (
    <Skeleton />
  ) : error ? (
    <S.ErrorLabel>{error.message}</S.ErrorLabel>
  ) : (
    data && <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />
  );
};

export default ApiSpec;
