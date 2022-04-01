import React, {useMemo} from 'react';

import {Skeleton} from 'antd';

import SwaggerUI from 'swagger-ui-react';

import {useGetApi} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {CollapseOperationsPlugin, TableOfContentsPlugin} from '@swaggerUI/plugins';

import * as S from './styled';

const RawApiSpec: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetApi({
    name: selectedApi?.name || '',
    namespace: selectedApi?.namespace || '',
    queryParams: {crd: true},
  });

  const rawApiSpec = useMemo(() => {
    if (!data?.raw) {
      return {};
    }

    return data.raw;
  }, [data]);

  return (
    <S.RawApiSpecContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <S.ErrorLabel>{error.message}</S.ErrorLabel>
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
