import {Skeleton} from 'antd';

import SwaggerUI from 'swagger-ui-react';
import YAML from 'yaml';

import {useAppSelector} from '@redux/hooks';
import {useGetApiCrdQuery} from '@redux/services/enhancedApi';

import {ErrorLabel} from '@components/AntdCustom';

import {DynamicServersPlugin, TableOfContentsPlugin} from '@swaggerUI/plugins';

import * as S from './styled';

const KUSK_EXTENSION_PROPERTY = 'x-kusk';

const PublicApiDefinition: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  // TODO: use api definition endpoint
  const {data, error, isLoading} = useGetApiCrdQuery({
    name: selectedApi?.name || '',
    namespace: selectedApi?.namespace || '',
  });

  return (
    <S.PublicApiDefinitionContainer>
      {isLoading ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error}</ErrorLabel>
      ) : (
        data && (
          <SwaggerUI
            spec={parseSpec(YAML.parse((data as any).spec.spec))}
            plugins={[TableOfContentsPlugin, DynamicServersPlugin]}
          />
        )
      )}
    </S.PublicApiDefinitionContainer>
  );
};

const parseSpec = (spec: any) => {
  if (!spec) {
    return {};
  }

  const topLevelDisabled = spec[KUSK_EXTENSION_PROPERTY]?.disabled;

  delete spec[KUSK_EXTENSION_PROPERTY];

  // path level
  Object.entries(spec.paths).forEach((pathEntry: [string, any]) => {
    const [path, pathValue] = pathEntry;

    const pathDisabled = pathValue[KUSK_EXTENSION_PROPERTY]?.disabled;

    delete spec.paths[path][KUSK_EXTENSION_PROPERTY];

    // method level
    Object.entries(pathValue).forEach((methodEntry: [string, any]) => {
      const [method, methodValue] = methodEntry;

      // check if top-level or path level disabled
      if (topLevelDisabled || pathDisabled || methodValue[KUSK_EXTENSION_PROPERTY]?.disabled) {
        // check if disabled is not set to false on path or operation level
        if (pathDisabled !== false && methodValue[KUSK_EXTENSION_PROPERTY]?.disabled !== false) {
          delete spec.paths[path][method];
        }
      }

      // delete x-kusk extension for operation level if still exists
      if (spec.paths[path][method]) {
        delete spec.paths[path][method][KUSK_EXTENSION_PROPERTY];
      }
    });

    if (!Object.keys(spec.paths[path]).length) {
      delete spec.paths[path];
    }
  });
  return spec;
};

export default PublicApiDefinition;
