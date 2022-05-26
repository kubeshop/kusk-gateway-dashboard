import {Suspense, useEffect, useMemo, useState} from 'react';

import {Button, Skeleton} from 'antd';

import {useGetNamespaces, useGetStaticRoutes} from '@models/api';

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

  const isStaticRouteModalVisible = useAppSelector(state => state.ui.staticRouteModal.isOpen);
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);

  const {data: namespaces} = useGetNamespaces({});
  const [selectedNamespace, setSelectedNamespace] = useState<string>();

  const {
    data,
    error,
    loading,
    refetch: refetchStaticRoutes,
  } = useGetStaticRoutes({queryParams: {namespace: selectedNamespace}});

  const renderedNamespacesOptions = useMemo(() => {
    return namespaces?.map(namespace => (
      <Option key={namespace.name} value={namespace.name}>
        {namespace.name}
      </Option>
    ));
  }, [namespaces]);

  const onNamespaceSelectHandler = (namespace: string) => {
    setSelectedNamespace(namespace);
    dispatch(selectStaticRoute(null));
  };

  const onNamespaceSelectionClearHandler = () => {
    setSelectedNamespace(undefined);
    dispatch(selectStaticRoute(null));
  };

  useEffect(() => {
    if (!loading) {
      refetchStaticRoutes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStaticRoute]);

  useEffect(() => {
    if (!data) {
      return;
    }

    dispatch(setStaticRoutes(data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handlePublishStaticRoute = () => {
    dispatch(openStaticRouteModal());
  };

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
        <Button type="primary" onClick={handlePublishStaticRoute}>
          Publish New Static Route
        </Button>
      </S.TitleFiltersContainer>

      {loading && !staticRoutes ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error.message}</ErrorLabel>
      ) : (
        staticRoutes && (
          <StaticRoutesListTable
            staticRoutes={staticRoutes.filter(el => el.namespace.includes(selectedNamespace || ''))}
          />
        )
      )}
      <Suspense fallback={null}>{isStaticRouteModalVisible && <AddStaticRouteModal />}</Suspense>
    </ContentWrapper>
  );
};

export default StaticRoutesList;
