import React from 'react';

import {Skeleton} from 'antd';

import SwaggerUI from 'swagger-ui-react';
import YAML from 'yaml';

import {useAppSelector} from '@redux/hooks';
import {useGetApiCrdQuery} from '@redux/services/enhancedApi';

import {ErrorLabel} from '@components/AntdCustom';

import {CollapseOperationsPlugin, TableOfContentsPlugin} from '@swaggerUI/plugins';

import * as S from './styled';

const ApiDefinition: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, isLoading} = useGetApiCrdQuery({
    name: selectedApi?.name || '',
    namespace: selectedApi?.namespace || '',
  });

  return (
    <S.ApiDefinitionContainer>
      {isLoading ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error}</ErrorLabel>
      ) : (
        data && (
          <SwaggerUI
            spec={YAML.parse((data as any).spec.spec)}
            plugins={[TableOfContentsPlugin, CollapseOperationsPlugin]}
            supportedSubmitMethods={[]}
          />
        )
      )}
    </S.ApiDefinitionContainer>
  );
};

export default ApiDefinition;
