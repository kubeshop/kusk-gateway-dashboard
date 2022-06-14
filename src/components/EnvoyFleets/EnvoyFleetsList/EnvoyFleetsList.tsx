import {useMemo, useState} from 'react';

import {Button, Skeleton} from 'antd';

import {useAppDispatch} from '@redux/hooks';
import {selectEnvoyFleet} from '@redux/reducers/main';
import {openEnvoyFleetModalModal} from '@redux/reducers/ui';
import {useGetEnvoyFleetsQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';

import {ContentWrapper, ErrorLabel, PageTitle} from '@components/AntdCustom';

import EnvoyFleetsListTable from './EnvoyFleetsListTable';

import * as S from './styled';

const {Option} = S.Select;

const EnvoyFleetsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectedNamespace, setSelectedNamespace] = useState<string>();

  const {data: namespaces} = useGetNamespacesQuery();
  const {data, error, isLoading} = useGetEnvoyFleetsQuery({namespace: selectedNamespace});

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

  const onPublishEnvoyFleetHandle = () => {
    dispatch(openEnvoyFleetModalModal());
  };

  return (
    <ContentWrapper>
      <PageTitle>Envoy Fleets</PageTitle>

      <S.TitleFiltersContainer>
        {isLoading ? (
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
        <Button type="primary" onClick={onPublishEnvoyFleetHandle}>
          Publish New Envoy Fleet
        </Button>
      </S.TitleFiltersContainer>

      {isLoading ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error}</ErrorLabel>
      ) : (
        data && <EnvoyFleetsListTable envoyFleets={data.filter(el => el.namespace.includes(selectedNamespace || ''))} />
      )}
    </ContentWrapper>
  );
};

export default EnvoyFleetsList;
