import {useMemo, useState} from 'react';

import {Skeleton} from 'antd';

import {useGetStaticRoutes} from '@models/api';

import {useAppDispatch} from '@redux/hooks';
import {selectStaticRoute} from '@redux/reducers/main';

import {ContentWrapper, ErrorLabel, ListTableTitleContainer, ListTableTitleLabel} from '@components/AntdCustom';

import StaticRoutesListTable from './StaticRoutesListTable';

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
    <ContentWrapper>
      <ListTableTitleContainer>
        <ListTableTitleLabel>Static Routes</ListTableTitleLabel>

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
      </ListTableTitleContainer>

      {loading ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error.message}</ErrorLabel>
      ) : (
        data && <StaticRoutesListTable staticRoutes={data} />
      )}
    </ContentWrapper>
  );
};

export default StaticRoutesList;