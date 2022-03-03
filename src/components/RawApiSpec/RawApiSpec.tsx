import React from 'react';

import {Skeleton} from 'antd';

import SwaggerUI from 'swagger-ui-react';

import openApiSpec from '@constants/rawOpenApiSpec.json';

import {useGetRawOpenApiSpec} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {KuskExtensionPlugin, TableOfContentsPlugin} from '@utils/swaggerUI/plugins';

import * as S from './styled';

const RawApiSpec: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetRawOpenApiSpec({apiId: selectedApi});

  return (
    <S.RawApiSpecContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <S.ErrorLabel>{error.message}</S.ErrorLabel>
      ) : (
        data && (
          <SwaggerUI
            spec={openApiSpec}
            plugins={[KuskExtensionPlugin]}
            presets={[() => [TableOfContentsPlugin]]}
            supportedSubmitMethods={[]}
          />
        )
      )}
    </S.RawApiSpecContainer>
  );
};

export default RawApiSpec;
