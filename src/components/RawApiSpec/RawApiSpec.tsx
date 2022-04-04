import React from 'react';

import {Skeleton} from 'antd';

import SwaggerUI from 'swagger-ui-react';

import {useGetApi} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {ErrorLabel} from '@components/AntdCustom';

import {CollapseOperationsPlugin, TableOfContentsPlugin} from '@swaggerUI/plugins';

import {useRawApiSpec} from '@utils/hooks';

import * as S from './styled';

const RawApiSpec: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetApi({
    name: selectedApi?.name || '',
    namespace: selectedApi?.namespace || '',
    queryParams: {crd: true},
  });

  const rawApiSpec = useRawApiSpec(selectedApi?.name || '', selectedApi?.namespace || '');

  return (
    <S.RawApiSpecContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error.message}</ErrorLabel>
      ) : (
        data && (
          <SwaggerUI
            spec={rawApiSpec}
            plugins={[TableOfContentsPlugin, CollapseOperationsPlugin]}
            supportedSubmitMethods={[]}
          />
        )
      )}
    </S.RawApiSpecContainer>
  );
};

export default RawApiSpec;
