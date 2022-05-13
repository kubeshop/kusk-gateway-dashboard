import {useEffect, useMemo, useState} from 'react';

import {Button, Select, Skeleton, Tag} from 'antd';

import {EnvoyFleetItem, useGetApis, useGetEnvoyFleets, useGetNamespaces} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApi, setApis} from '@redux/reducers/main';
import {openApiPublishModal} from '@redux/reducers/ui';

import {ContentWrapper, ErrorLabel, PageTitle} from '@components/AntdCustom';

import {getEnvoyFleetKey} from '@utils/envoyFleet';

import ApisListTable from './ApisListTable';

import * as S from './styled';

const {Option} = Select;

const ApisList: React.FC = () => {
  const dispatch = useAppDispatch();
  const apis = useAppSelector(state => state.main.apis);

  const [selectedFleet, setSelectedFleet] = useState<EnvoyFleetItem>();
  const [selectedNamespace, setSelectedNamespace] = useState<string>();
  const {data: namespaces} = useGetNamespaces({});
  const {data, error, loading} = useGetApis({
    queryParams: {
      fleetname: selectedFleet?.name,
      fleetnamespace: selectedFleet?.namespace,
      namespace: selectedNamespace,
    },
  });

  const envoyFleetsState = useGetEnvoyFleets({});

  const renderedFleetsOptions = useMemo(() => {
    if (!envoyFleetsState?.data?.length || !Array.isArray(envoyFleetsState.data)) {
      return null;
    }

    return envoyFleetsState.data
      .filter(el => el.namespace.includes(selectedNamespace || ''))
      .map(envoyFleetItem => (
        <Option key={getEnvoyFleetKey(envoyFleetItem)} value={envoyFleetItem.name} envoyfleet={envoyFleetItem}>
          <Tag>{envoyFleetItem.namespace}</Tag>
          {envoyFleetItem.name}
        </Option>
      ));
  }, [envoyFleetsState.data, selectedNamespace]);

  const renderedNamespaceOptions = useMemo(() => {
    return namespaces?.map(namespace => (
      <Option key={namespace.name} value={namespace.name}>
        {namespace.name}
      </Option>
    ));
  }, [namespaces]);

  const onEnvoyFleetSelectHandler = (envoyFleetItem: EnvoyFleetItem) => {
    setSelectedFleet(envoyFleetItem);
    dispatch(selectApi(null));
  };

  const onNamespaceSelectHandler = (namespace: string) => {
    setSelectedNamespace(namespace);
    dispatch(selectApi(null));
  };

  const onEnvoyFleetSelectionClearHandler = () => {
    setSelectedFleet(undefined);
    dispatch(selectApi(null));
  };

  const onNamespaceSelectionClearHandler = () => {
    setSelectedNamespace(undefined);
    dispatch(selectApi(null));
  };

  const showApiPublishModalHandler = () => {
    dispatch(openApiPublishModal());
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    dispatch(setApis(data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <ContentWrapper>
      <PageTitle>APIs</PageTitle>

      <S.ActionsContainer>
        <S.FiltersContainer>
          {envoyFleetsState.loading ? (
            <Skeleton.Button />
          ) : envoyFleetsState.error ? (
            <ErrorLabel>{envoyFleetsState.error.message}</ErrorLabel>
          ) : (
            envoyFleetsState.data && (
              <Select
                allowClear
                placeholder="Select a fleet"
                showSearch
                onClear={onEnvoyFleetSelectionClearHandler}
                onSelect={(value: any, option: any) => {
                  onEnvoyFleetSelectHandler(option.envoyfleet);
                }}
              >
                {renderedFleetsOptions}
              </Select>
            )
          )}

          {loading ? (
            <Skeleton.Button />
          ) : error ? null : (
            <Select
              allowClear
              placeholder="Select a namespace"
              value={selectedNamespace}
              showSearch
              onClear={onNamespaceSelectionClearHandler}
              onSelect={(value: any) => {
                onNamespaceSelectHandler(value);
              }}
            >
              {renderedNamespaceOptions}
            </Select>
          )}
        </S.FiltersContainer>

        <Button
          disabled={loading || Boolean(error) || !Array.isArray(data)}
          type="primary"
          onClick={showApiPublishModalHandler}
        >
          Publish new API
        </Button>
      </S.ActionsContainer>

      {loading && !apis ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error.message}</ErrorLabel>
      ) : (
        apis && <ApisListTable apis={apis} />
      )}
    </ContentWrapper>
  );
};

export default ApisList;
