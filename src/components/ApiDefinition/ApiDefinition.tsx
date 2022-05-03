import React from 'react';

import {Skeleton} from 'antd';

import SwaggerUI from 'swagger-ui-react';
import YAML from 'yaml';

import {useGetApiCRD} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {ErrorLabel} from '@components/AntdCustom';

import {CollapseOperationsPlugin, TableOfContentsPlugin} from '@swaggerUI/plugins';

import * as S from './styled';

const ApiDefinition: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetApiCRD({name: selectedApi?.name || '', namespace: selectedApi?.namespace || ''});

  return (
    <S.ApiDefinitionContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error.message}</ErrorLabel>
      ) : (
        data && (
          <SwaggerUI
            spec={YAML.parse(data.spec.spec)}
            plugins={[TableOfContentsPlugin, CollapseOperationsPlugin]}
            supportedSubmitMethods={[]}
          />
        )
      )}
    </S.ApiDefinitionContainer>
  );
};

export default ApiDefinition;
