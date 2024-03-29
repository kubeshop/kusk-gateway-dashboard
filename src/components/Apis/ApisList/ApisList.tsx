import {useMemo, useState} from 'react';

import {Button, Input, Select, Skeleton, Typography} from 'antd';

import {SearchOutlined} from '@ant-design/icons';

import {useAppDispatch} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';
import {openApiPublishModal} from '@redux/reducers/ui';
import {useGetApisQuery, useGetEnvoyFleetsQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';
import {EnvoyFleetItem} from '@redux/services/kuskApi';

import {ContentWrapper, PageTitle} from '@components/AntdCustom';
import {DiscordCard, HelpCard, HelpCardGroup} from '@components/HelpCard';
import {KuskApisDown} from '@components/KuskApiDown';
import {GridItemSkeleton} from '@components/Skeletons';

import NoResultsImg from '@assets/noresults.svg';

import ApisListTable from './ApisListTable';
import EmptyApisList from './EmptyApisList';

import * as S from './styled';

const {Option} = Select;

const APIsSkelton = () => (
  <S.Grid>
    {new Array(6).fill(0).map((_, index) => {
      const key = `skeleton-item-${index}`;

      return <GridItemSkeleton key={key} />;
    })}
  </S.Grid>
);

const ApisList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectedNamespace, setSelectedNamespace] = useState<string>();
  const [selectedFleet, setSelectedFleet] = useState<EnvoyFleetItem>();

  const [searchApiName, setSearchApiName] = useState<string>('');
  const {data: namespaces} = useGetNamespacesQuery();
  const {data: fleets} = useGetEnvoyFleetsQuery({});
  const {data, error, isError, isLoading} = useGetApisQuery({
    namespace: selectedNamespace,
    fleetname: selectedFleet?.name,
    fleetnamespace: selectedFleet?.namespace,
  });

  const renderedNamespaceOptions = useMemo(() => {
    return namespaces?.map(namespace => (
      <Option key={namespace.name} value={namespace.name}>
        {namespace.name}
      </Option>
    ));
  }, [namespaces]);

  const onNamespaceSelectHandler = (namespace: string) => {
    setSelectedNamespace(namespace);
    dispatch(selectApi(null));
  };

  const onNamespaceSelectionClearHandler = () => {
    setSelectedNamespace(undefined);
    dispatch(selectApi(null));
  };

  const onFleetSelectHandler = (fleet: string) => {
    const [namespace, name] = fleet.split('@');
    setSelectedFleet(fleets?.find(el => el.namespace === namespace && el.name === name));
  };

  const onFleetSelectionClearHandler = () => {
    setSelectedFleet(undefined);
  };

  const onSearchApiNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchApiName(e.currentTarget.value);
  };

  const showApiPublishModalHandler = () => {
    dispatch(openApiPublishModal());
  };

  return isError ? (
    <KuskApisDown />
  ) : (
    <ContentWrapper>
      <S.Header>
        <PageTitle>APIS</PageTitle>
        <Typography.Text type="secondary">Explore your APIs at a glance...</Typography.Text>
      </S.Header>

      {data?.length === 0 && !selectedNamespace && !selectedFleet ? (
        <EmptyApisList />
      ) : (
        <>
          <S.ActionsContainer>
            <S.FiltersContainer>
              <Input allowClear prefix={<SearchOutlined />} placeholder="API Name" onChange={onSearchApiNameChange} />

              {isLoading ? (
                <Skeleton.Input />
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

              {isLoading ? (
                <Skeleton.Input />
              ) : !fleets ? null : (
                <Select
                  allowClear
                  placeholder="Select a deployment fleet"
                  value={selectedFleet && `${selectedFleet?.namespace}@${selectedFleet?.name}`}
                  showSearch
                  onClear={onFleetSelectionClearHandler}
                  onSelect={onFleetSelectHandler}
                >
                  {fleets?.map(fleet => (
                    <Option key={fleet.name} value={`${fleet.namespace}@${fleet.name}`}>
                      {fleet.name}
                    </Option>
                  ))}
                </Select>
              )}
            </S.FiltersContainer>

            <Button
              disabled={isLoading || Boolean(error) || !Array.isArray(data)}
              type="primary"
              onClick={showApiPublishModalHandler}
            >
              Create API
            </Button>
          </S.ActionsContainer>

          {isLoading ? (
            <APIsSkelton />
          ) : data && data.filter(el => el.name.includes(searchApiName)).length > 0 ? (
            <ApisListTable apis={data.filter(el => el.name.includes(searchApiName))} />
          ) : (
            <S.NoResults>
              <img src={NoResultsImg} />
              <Typography.Title level={2}>No results found.</Typography.Title>
              <Typography.Text type="secondary">
                Try altering your search or filters to find what you’re looking for.
              </Typography.Text>
            </S.NoResults>
          )}
          <S.HelpSection>
            <HelpCardGroup>
              <HelpCard title="Handle different environments for one API gateway" />
              <HelpCard title="Version your gateway like a pro" />
              <HelpCard title="How to deploy your API gateway" />
            </HelpCardGroup>
            <DiscordCard />
          </S.HelpSection>
        </>
      )}
    </ContentWrapper>
  );
};

export default ApisList;
