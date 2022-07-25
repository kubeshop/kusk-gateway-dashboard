import {useMemo, useState} from 'react';
import {useTracking} from 'react-tracking';

import {Button, Select, Skeleton, Tag, Typography} from 'antd';

import {ANALYTIC_TYPE, Events} from '@models/analytics';

import {useAppDispatch} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';
import {openApiPublishModal} from '@redux/reducers/ui';
import {useGetApisQuery, useGetEnvoyFleetsQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';
import {EnvoyFleetItem} from '@redux/services/kuskApi';

import {ContentWrapper, ErrorLabel, PageTitle} from '@components/AntdCustom';

import {getEnvoyFleetKey} from '@utils/envoyFleet';

import ApisListTable from './ApisListTable';
import EmptyApisList from './EmptyApisList';

import * as S from './styled';

const {Option} = Select;

const ApisList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {trackEvent} = useTracking(
    {eventName: Events.API_LIST_LOADED, type: ANALYTIC_TYPE.ACTION},
    {dispatchOnMount: true}
  );

  const [selectedFleet, setSelectedFleet] = useState<EnvoyFleetItem>();
  const [selectedNamespace, setSelectedNamespace] = useState<string>();
  const {data: namespaces} = useGetNamespacesQuery();
  const {data, error, isError, isLoading} = useGetApisQuery({
    fleetname: selectedFleet?.name,
    fleetnamespace: selectedFleet?.namespace,
    namespace: selectedNamespace,
  });

  const {data: fleets, isLoading: isLoadingFleets} = useGetEnvoyFleetsQuery({});

  const renderedFleetsOptions = useMemo(() => {
    if (!fleets?.length || !Array.isArray(fleets)) {
      return null;
    }

    return fleets
      .filter(el => el.namespace.includes(selectedNamespace || ''))
      .map(envoyFleetItem => (
        <Option key={getEnvoyFleetKey(envoyFleetItem)} value={envoyFleetItem.name} envoyfleet={envoyFleetItem}>
          <Tag>{envoyFleetItem.namespace}</Tag>
          {envoyFleetItem.name}
        </Option>
      ));
  }, [fleets, selectedNamespace]);

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
    trackEvent({eventName: Events.DROPDOWN_SELECTED, type: ANALYTIC_TYPE.ACTION});
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

  return (
    <ContentWrapper>
      <div>
        <PageTitle>API gateways</PageTitle>
        <Typography.Text type="secondary">Explore your APIs at a glance...</Typography.Text>
      </div>
      {data?.length === 0 ? (
        <EmptyApisList />
      ) : (
        <>
          <S.ActionsContainer>
            <S.FiltersContainer>
              {isLoadingFleets ? (
                <Skeleton.Button />
              ) : (
                fleets && (
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

              {isLoading ? (
                <Skeleton.Button />
              ) : !namespaces ? null : (
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
              disabled={isLoading || Boolean(error) || !Array.isArray(data)}
              type="primary"
              onClick={showApiPublishModalHandler}
            >
              Publish new API
            </Button>
          </S.ActionsContainer>

          {isLoading ? (
            <Skeleton />
          ) : isError ? (
            <ErrorLabel>{error?.message}</ErrorLabel>
          ) : (
            data && <ApisListTable apis={data} />
          )}
        </>
      )}
    </ContentWrapper>
  );
};

export default ApisList;
