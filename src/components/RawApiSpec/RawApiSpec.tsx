import React from 'react';

import {Skeleton} from 'antd';

import SwaggerUI from 'swagger-ui-react';
import YAML from 'yaml';

import {useGetRawOpenApiSpec} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {CollapseOperationsPlugin, TableOfContentsPlugin} from '@swaggerUI/plugins';

import * as S from './styled';

const RawApiSpec: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetRawOpenApiSpec({
    name: selectedApi?.name || '',
    namespace: selectedApi?.namespace || '',
  });

  return (
    <S.RawApiSpecContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <S.ErrorLabel>{error.message}</S.ErrorLabel>
      ) : (
        data && (
          // TODO: Remove JSON parse/stringify after modying openapi spec
          <SwaggerUI
            spec={YAML.parse(JSON.parse(JSON.stringify(data)))}
            plugins={[TableOfContentsPlugin, CollapseOperationsPlugin]}
            supportedSubmitMethods={[]}
          />
        )
      )}
    </S.RawApiSpecContainer>
  );
};

export default RawApiSpec;
