import {Suspense, useEffect, useMemo, useState} from 'react';

import {Button, Skeleton} from 'antd';

import {useGetStaticRoutes} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectStaticRoute, setStaticRoutes} from '@redux/reducers/main';
import {openStaticRouteModal} from '@redux/reducers/ui';

import {AddStaticRouteModal} from '@components/AddStaticRouteModal';
import {ContentWrapper, ErrorLabel, PageTitle} from '@components/AntdCustom';

import StaticRoutesListTable from './StaticRoutesListTable';

import * as S from './styled';

const {Option} = S.Select;

const StaticRoutesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const staticRoutes = useAppSelector(state => state.main.staticRoutes);
  const isStaticRouteVisible = useAppSelector(state => state.ui.staticRouteModal.isOpen);

  const [selectedNamespace, setSelectedNamespace] = useState<string>();

  const {data, error, loading} = useGetStaticRoutes({queryParams: {namespace: selectedNamespace}});

  const staticRoutesNamespaces = useMemo((): string[] => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    const namespaces = data.map(staticRouteItem => staticRouteItem.namespace);

    return [...Array.from(new Set(namespaces))];
  }, [data]);

  const renderedNamespacesOptions = useMemo(() => {
    if (!staticRoutesNamespaces?.length) {
      return null;
    }

    return staticRoutesNamespaces.map(namespace => (
      <Option key={namespace} value={namespace}>
        {namespace}
      </Option>
    ));
  }, [staticRoutesNamespaces]);

  const onNamespaceSelectHandler = (namespace: string) => {
    setSelectedNamespace(namespace);
    dispatch(selectStaticRoute(null));
  };

  const onNamespaceSelectionClearHandler = () => {
    setSelectedNamespace(undefined);
    dispatch(selectStaticRoute(null));
  };

  const handleCreateStaticRouteClick = () => {
    dispatch(openStaticRouteModal());
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    dispatch(setStaticRoutes(data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <ContentWrapper>
      <PageTitle>Static Routes</PageTitle>

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
            {renderedNamespacesOptions}
          </S.Select>
        )}
        <Button
          disabled={loading || Boolean(error) || !Array.isArray(data)}
          type="primary"
          onClick={handleCreateStaticRouteClick}
        >
          Create new static route
        </Button>
      </S.TitleFiltersContainer>

      {loading && !staticRoutes ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error.message}</ErrorLabel>
      ) : (
        staticRoutes && <StaticRoutesListTable staticRoutes={staticRoutes} />
      )}
      <Suspense fallback={null}>{isStaticRouteVisible && <AddStaticRouteModal />}</Suspense>
    </ContentWrapper>
  );
};

export default StaticRoutesList;
