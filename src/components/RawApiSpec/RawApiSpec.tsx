import React from 'react';

import {Skeleton} from 'antd';

import SwaggerUI from 'swagger-ui-react';

import openApiSpec from '@constants/kuskOpenApiSpec.json';

import {useGetApiOpenApiSpec} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

const RawApiSpec: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetApiOpenApiSpec({apiId: selectedApi});

  return (
    <S.RawApiSpecContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <S.ErrorLabel>{error.message}</S.ErrorLabel>
      ) : (
        data && <SwaggerUI spec={openApiSpec} />
      )}
    </S.RawApiSpecContainer>
  );
};

export default RawApiSpec;
