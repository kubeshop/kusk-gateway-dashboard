import {useMemo, useState} from 'react';

import {Button, Input, Select, Skeleton, Typography} from 'antd';

import {SearchOutlined} from '@ant-design/icons';

import {useAppDispatch} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';
import {openApiPublishModal} from '@redux/reducers/ui';
import {useGetApisQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';

import {ContentWrapper, PageTitle} from '@components/AntdCustom';
import {DiscordCard, HelpCard, HelpCardGroup} from '@components/HelpCard';
import {KuskApisDown} from '@components/KuskApiDown';

import ApisListTable from './ApisListTable';
import EmptyApisList from './EmptyApisList';

import * as S from './styled';

const {Option} = Select;

const ApisList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectedNamespace, setSelectedNamespace] = useState<string>();
  const [searchApiName, setSearchApiName] = useState<string>('');
  const {data: namespaces} = useGetNamespacesQuery();
  const {data, error, isError, isLoading} = useGetApisQuery({
    namespace: selectedNamespace,
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
        <PageTitle>API gateways</PageTitle>
        <Typography.Text type="secondary">Explore your APIs at a glance...</Typography.Text>
      </S.Header>

      {data?.length === 0 ? (
        <EmptyApisList />
      ) : (
        <>
          <S.ActionsContainer>
            <S.FiltersContainer>
              <Input allowClear prefix={<SearchOutlined />} placeholder="API Name" onChange={onSearchApiNameChange} />

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
              Add a new API gateway
            </Button>
          </S.ActionsContainer>

          {isLoading ? (
            <Skeleton />
          ) : (
            data && <ApisListTable apis={data.filter(el => el.name.includes(searchApiName))} />
          )}
          <S.HelpSection>
            <HelpCardGroup>
              <HelpCard title="Handle different environments for one API gateway" link="" />
              <HelpCard title="Version your gateway like a pro" link="" />
              <HelpCard title="How to deploy your API gateway" link="" />
            </HelpCardGroup>
            <DiscordCard />
          </S.HelpSection>
        </>
      )}
    </ContentWrapper>
  );
};

export default ApisList;
