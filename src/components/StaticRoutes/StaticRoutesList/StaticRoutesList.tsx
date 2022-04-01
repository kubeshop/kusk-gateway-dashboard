import {useMemo, useState} from 'react';

import {Skeleton} from 'antd';

import {useGetStaticRoutes} from '@models/api';

import {useAppDispatch} from '@redux/hooks';
import {selectStaticRoute} from '@redux/reducers/main';

import * as S from './styled';

const {Option} = S.Select;

const StaticRoutesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedNamespace, setSelectedNamespace] = useState<string>();

  const {data, error, loading} = useGetStaticRoutes({queryParams: {namespace: selectedNamespace}});

  const staticRoutesNamespaces = useMemo((): string[] => {
    if (!data) {
      return [];
    }

    const namespaces = data.map(staticRouteItem => staticRouteItem.namespace);

    return [...Array.from(new Set(namespaces))];
  }, [data]);

  const onNamespaceSelectHandler = (namespace: string) => {
    setSelectedNamespace(namespace);
    dispatch(selectStaticRoute(null));
  };

  const onNamespaceSelectionClearHandler = () => {
    setSelectedNamespace(undefined);
    dispatch(selectStaticRoute(null));
  };

  return (
    <S.StaticRoutesListContainer>
      <S.TitleContainer>
        <S.TitleLabel>Static Routes</S.TitleLabel>

        <S.TitleFiltersContainer>
          {loading ? (
            <Skeleton.Button />
          ) : error ? null : (
            <S.Select
              allowClear
              placeholder="Select a namespace"
              value={selectedNamespace}
              showSearch
              onClear={onNamespaceSelectionClearHandler}
              onSelect={(value: any) => {
                onNamespaceSelectHandler(value);
              }}
            >
              {staticRoutesNamespaces.map(namespace => (
                <Option key={namespace} value={namespace}>
                  {namespace}
                </Option>
              ))}
            </S.Select>
          )}
        </S.TitleFiltersContainer>
      </S.TitleContainer>

      {loading ? <Skeleton /> : error ? <S.ErrorLabel>{error.message}</S.ErrorLabel> : data && null}
    </S.StaticRoutesListContainer>
  );
};

export default StaticRoutesList;
