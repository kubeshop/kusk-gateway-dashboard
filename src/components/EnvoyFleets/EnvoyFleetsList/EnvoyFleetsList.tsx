import {useMemo, useState} from 'react';

import {Skeleton} from 'antd';

import {useGetEnvoyFleets, useGetNamespaces} from '@models/api';

import {useAppDispatch} from '@redux/hooks';
import {selectEnvoyFleet} from '@redux/reducers/main';

import {ContentWrapper, ErrorLabel, PageTitle} from '@components/AntdCustom';

import EnvoyFleetsListTable from './EnvoyFleetsListTable';

import * as S from './styled';

const {Option} = S.Select;

const EnvoyFleetsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectedNamespace, setSelectedNamespace] = useState<string>();
  const {data: namespaces} = useGetNamespaces({});
  const {data, error, loading} = useGetEnvoyFleets({queryParams: {namespace: selectedNamespace}});

  const renderedNamespacesOptions = useMemo(() => {
    return namespaces?.map(namespace => (
      <Option key={namespace.name} value={namespace.name}>
        {namespace.name}
      </Option>
    ));
  }, [namespaces]);

  const onNamespaceSelectHandler = (namespace: string) => {
    setSelectedNamespace(namespace);
    dispatch(selectEnvoyFleet(null));
  };

  const onNamespaceSelectionClearHandler = () => {
    setSelectedNamespace(undefined);
    dispatch(selectEnvoyFleet(null));
  };

  return (
    <ContentWrapper>
      <PageTitle>Envoy Fleets</PageTitle>

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
      </S.TitleFiltersContainer>

      {loading ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error.message}</ErrorLabel>
      ) : (
        data && <EnvoyFleetsListTable envoyFleets={data.filter(el => el.namespace.includes(selectedNamespace || ''))} />
      )}
    </ContentWrapper>
  );
};

export default EnvoyFleetsList;
