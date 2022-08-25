import {useTracking} from 'react-tracking';

import {Card, Skeleton} from 'antd';

import YAML from 'yaml';

import {SUPPORTED_METHODS} from '@constants/constants';

import {ANALYTIC_TYPE, Events} from '@models/analytics';
import {KuskExtensionsItem} from '@models/dashboard';

import {useAppSelector} from '@redux/hooks';
import {useGetApiCrdQuery} from '@redux/services/enhancedApi';

import {ErrorLabel} from '@components/AntdCustom';

import {getOperationId} from '@swaggerUI/utils/operations';
import {getPathId} from '@swaggerUI/utils/path';

import KuskExtensionsPanelContent from './KuskExtensionsPanelContent';

import * as S from './styled';

const KuskExtensions: React.FC = () => {
  useTracking({eventName: Events.API_KUSK_EXTENSION_LOADED, type: ANALYTIC_TYPE.ACTION}, {dispatchOnMount: true});
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, isLoading, error} = useGetApiCrdQuery({
    name: selectedApi?.name || '',
    namespace: selectedApi?.namespace || '',
  });

  return (
    <S.KuskExtensionsContainer>
      {isLoading ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error}</ErrorLabel>
      ) : (
        <Card style={{marginTop: 85}}>
          {data &&
            Object.entries(createKuskExtensions(YAML.parse((data as any).spec.spec))).map(kuskExtensionEntry => {
              const [, entry] = kuskExtensionEntry;

              if (entry && entry.length) {
                return entry
                  .sort((a: any, b: any) => a.path.localeCompare(b.path))
                  .map(item => <KuskExtensionsPanelContent kuskExtension={item.kuskExtension} path={item.path} />);
              }

              return null;
            })}
        </Card>
      )}
    </S.KuskExtensionsContainer>
  );
};

const createKuskExtensions = (spec: any) => {
  let kuskExtensions: {top: KuskExtensionsItem[]; path: KuskExtensionsItem[]; operation: KuskExtensionsItem[]} = {
    top: [],
    path: [],
    operation: [],
  };

  if (spec['x-kusk']) {
    kuskExtensions['top'].push({id: 'root-extension', kuskExtension: spec['x-kusk'], path: 'Root Level'});
  }

  Object.entries(spec.paths).forEach((pathEntry: [string, any]) => {
    const [path, pathValue] = pathEntry;
    const pathId = getPathId(path);

    if (pathValue['x-kusk']) {
      kuskExtensions['path'].push({id: pathId, kuskExtension: pathValue['x-kusk'], path});
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
              tag,
              method: operation,
              kuskExtension: operationValue['x-kusk'],
              path,
            });
          });
        }
      });
  });

  return kuskExtensions;
};

export default KuskExtensions;
