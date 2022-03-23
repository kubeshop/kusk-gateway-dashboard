import {Skeleton} from 'antd';

import SwaggerUI from 'swagger-ui-react';
import YAML from 'yaml';

import {useGetRawOpenApiSpec} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {DynamicServersPlugin, TableOfContentsPlugin} from '@swaggerUI/plugins';

import * as S from './styled';

const PostProcessedApiSpec: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  // TODO: use postProcessed endpoint
  const {data, error, loading} = useGetRawOpenApiSpec({
    name: selectedApi?.name || '',
    namespace: selectedApi?.namespace || '',
  });

  return (
    <S.PostProcessedApiSpecContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <S.ErrorLabel>{error.message}</S.ErrorLabel>
      ) : (
        data && <SwaggerUI spec={parseSpec(YAML.parse(data))} plugins={[TableOfContentsPlugin, DynamicServersPlugin]} />
      )}
    </S.PostProcessedApiSpecContainer>
  );
};

const parseSpec = (spec: any) => {
  const topLevelDisabled = spec['x-kusk']?.disabled;

  delete spec['x-kusk'];

  // path level
  Object.entries(spec.paths).forEach((pathEntry: [string, any]) => {
    const [path, pathValue] = pathEntry;

    const pathDisabled = pathValue['x-kusk']?.disabled;

    delete spec.paths[path]['x-kusk'];

    // method level
    Object.entries(pathValue).forEach((methodEntry: [string, any]) => {
      const [method, methodValue] = methodEntry;

      // check if top-level or path level disabled
      if (topLevelDisabled || pathDisabled || methodValue['x-kusk']?.disabled) {
        // check if disabled is not set to false on path or operation level
        if (pathDisabled !== false && methodValue['x-kusk']?.disabled !== false) {
          delete spec.paths[path][method];
        }
      }

      // delete x-kusk extension for operation level if still exists
      if (spec.paths[path][method]) {
        delete spec.paths[path][method]['x-kusk'];
      }
    });

    if (!Object.keys(spec.paths[path]).length) {
      delete spec.paths[path];
    }
  });
  return spec;
};

export default PostProcessedApiSpec;
