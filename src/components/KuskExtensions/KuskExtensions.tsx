import {Skeleton} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';
import openApiSpec from '@constants/rawOpenApiSpec.json';

import {useGetRawOpenApiSpec} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {getOperationId} from '@swaggerUI/utils/operations';

import * as S from './styled';

const createKuskExtensions = (spec: any) => {
  let kuskExtensions: {top: any[]; path: any[]; operation: any[]} = {top: [], path: [], operation: []};

  if (spec['x-kusk']) {
    kuskExtensions['top'].push({id: 'top-level-extension', kuskExtension: spec['x-kusk']});
  }

  Object.entries(spec.paths).forEach((pathEntry: [string, any]) => {
    const [path, pathValue] = pathEntry;
    const pathId = path.substring(1).replaceAll('{', '').replaceAll('}', '').replaceAll('/', '-');

    if (pathValue['x-kusk']) {
      kuskExtensions['path'].push({id: pathId, kuskExtension: pathValue['x-kusk']});
    }

    Object.entries(pathValue)
      .filter(entry => SUPPORTED_METHODS.includes(entry[0]))
      .forEach((operationEntry: [string, any]) => {
        const [operation, operationValue] = operationEntry;

        const operationId = getOperationId(path, operation, operationValue);
        const tags: string[] = operationValue.tags || ['default'];

        if (operationValue['x-kusk']) {
          tags.forEach((tag: string) => {
            kuskExtensions['operation'].push({
              id: `operations-${tag}-${operationId}`,
              kuskExtension: operationValue['x-kusk'],
            });
          });
        }
      });
  });

  return kuskExtensions;
};

const KuskExtensions: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, loading, error} = useGetRawOpenApiSpec({apiId: selectedApi});

  const kuskExtensions = createKuskExtensions(openApiSpec);

  console.log(kuskExtensions);

  return (
    <S.KuskExtensionsContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <S.ErrorLabel>{error.message}</S.ErrorLabel>
      ) : (
        data && <div>Kusk Extensions</div>
      )}
    </S.KuskExtensionsContainer>
  );
};

export default KuskExtensions;
