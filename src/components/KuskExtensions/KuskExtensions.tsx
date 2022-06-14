import {Collapse, Skeleton} from 'antd';

import YAML from 'yaml';

import {SUPPORTED_METHODS} from '@constants/constants';

import {KuskExtensionsItem} from '@models/dashboard';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setKuskExtensionsActiveKeys} from '@redux/reducers/ui';
import {useGetApiCrdQuery} from '@redux/services/enhancedApi';

import {ErrorLabel} from '@components/AntdCustom';

import {getOperationId} from '@swaggerUI/utils/operations';
import {getPathId} from '@swaggerUI/utils/path';

import KuskExtensionsPanelContent from './KuskExtensionsPanelContent';
import KuskExtensionsPanelHeader from './KuskExtensionsPanelHeader';

import * as S from './styled';

const {Panel} = Collapse;

const KuskExtensions: React.FC = () => {
  const dispatch = useAppDispatch();
  const kuskExtensionsActiveKeys = useAppSelector(state => state.ui.kuskExtensionsActiveKeys);
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
        data &&
        Object.entries(createKuskExtensions(YAML.parse((data as any).spec.spec))).map(kuskExtensionEntry => {
          const [level, entry] = kuskExtensionEntry;

          const title = level.charAt(0).toUpperCase() + level.substring(1);

          if (entry && entry.length) {
            return (
              <S.LevelContainer key={level}>
                <S.LevelTitle>{title} level</S.LevelTitle>

                <Collapse
                  activeKey={kuskExtensionsActiveKeys[level]}
                  onChange={keys => dispatch(setKuskExtensionsActiveKeys({keys: keys as string[], level}))}
                >
                  {entry
                    .sort((a: any, b: any) => a.path.localeCompare(b.path))
                    .map(item => (
                      <Panel
                        header={
                          <KuskExtensionsPanelHeader
                            level={level}
                            method={item.method}
                            path={item.path}
                            tag={item.tag}
                          />
                        }
                        key={item.id}
                        id={item.id}
                      >
                        <KuskExtensionsPanelContent kuskExtension={item.kuskExtension} />
                      </Panel>
                    ))}
                </Collapse>
              </S.LevelContainer>
            );
          }

          return null;
        })
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
    kuskExtensions['top'].push({id: 'top-level-extension', kuskExtension: spec['x-kusk'], path: 'Top-level extension'});
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
