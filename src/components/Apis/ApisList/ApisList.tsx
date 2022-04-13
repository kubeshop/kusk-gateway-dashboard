import {useEffect, useMemo, useState} from 'react';

import {Select, Skeleton, Tag, Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';
import {EnvoyFleetInfoTooltip} from '@constants/tooltips';

import {EnvoyFleetItem, useGetApis, useGetEnvoyFleets} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApi, setApis} from '@redux/reducers/main';
import {openApiDeployModal, toggleEnvoyFleetInfoModal} from '@redux/reducers/ui';

import {ContentWrapper, ErrorLabel, ListTableTitleContainer, ListTableTitleLabel} from '@components/AntdCustom';

import {getEnvoyFleetKey} from '@utils/envoyFleet';

import ApisListTable from './ApisListTable';

import * as S from './styled';

const {Option} = Select;

const ApisList: React.FC = () => {
  const dispatch = useAppDispatch();
  const apis = useAppSelector(state => state.main.apis);

  const [selectedFleet, setSelectedFleet] = useState<EnvoyFleetItem>();
  const [selectedNamespace, setSelectedNamespace] = useState<string>();

  const {data, error, loading} = useGetApis({
    queryParams: {
      fleetname: selectedFleet?.name,
      fleetnamespace: selectedFleet?.namespace,
      namespace: selectedNamespace,
    },
  });
  const envoyFleetsState = useGetEnvoyFleets({});

  const apisNamespaces = useMemo((): string[] => {
    if (!data) {
      return [];
    }

    const namespaces = data.map(apiItem => apiItem.namespace);

    return [...Array.from(new Set(namespaces))];
  }, [data]);

  const onEnvoyFleetSelectHandler = (envoyFleetItem: EnvoyFleetItem) => {
    setSelectedFleet(envoyFleetItem);
    dispatch(selectApi(null));
  };

  const onNamespaceSelectHandler = (namespace: string) => {
    setSelectedNamespace(namespace);
    dispatch(selectApi(null));
  };

  const onEnvoyFleetInfoIconClickHandler = () => {
    if (!selectedFleet) {
      return;
    }

    dispatch(toggleEnvoyFleetInfoModal({name: selectedFleet.name, namespace: selectedFleet.namespace}));
  };

  const onEnvoyFleetSelectionClearHandler = () => {
    setSelectedFleet(undefined);
    dispatch(selectApi(null));
  };

  const onNamespaceSelectionClearHandler = () => {
    setSelectedNamespace(undefined);
    dispatch(selectApi(null));
  };

  const showApiDeployModalHandler = () => {
    dispatch(openApiDeployModal());
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
      <ListTableTitleContainer>
        <ListTableTitleLabel>APIs</ListTableTitleLabel>

        <S.TitleFiltersContainer>
          <S.EnvoyFleetFilterContainer>
            {envoyFleetsState.loading ? (
              <Skeleton.Button />
            ) : envoyFleetsState.error ? (
              <ErrorLabel>{envoyFleetsState.error.message}</ErrorLabel>
            ) : (
              envoyFleetsState.data && (
                <S.Select
                  allowClear
                  placeholder="Select a fleet"
                  showSearch
                  onClear={onEnvoyFleetSelectionClearHandler}
                  onSelect={(value: any, option: any) => {
                    onEnvoyFleetSelectHandler(option.envoyfleet);
                  }}
                >
                  {envoyFleetsState.data.map(envoyFleetItem => (
                    <Option
                      key={getEnvoyFleetKey(envoyFleetItem)}
                      value={envoyFleetItem.name}
                      envoyfleet={envoyFleetItem}
                    >
                      <Tag>{envoyFleetItem.namespace}</Tag>
                      {envoyFleetItem.name}
                    </Option>
                  ))}
                </S.Select>
              )
            )}

            {selectedFleet && (
              <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={EnvoyFleetInfoTooltip}>
                <S.QuestionCircleOutlined onClick={onEnvoyFleetInfoIconClickHandler} />
              </Tooltip>
            )}
          </S.EnvoyFleetFilterContainer>

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
              {apisNamespaces.map(namespace => (
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
        apis && (
          <>
            <ApisListTable apis={apis} /> <S.Button onClick={showApiDeployModalHandler}>Publish new API</S.Button>
          </>
        )
      )}
    </ContentWrapper>
  );
};

export default ApisList;
