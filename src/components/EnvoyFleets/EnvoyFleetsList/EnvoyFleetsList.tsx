import {useMemo, useState} from 'react';

import {Skeleton} from 'antd';

import {useGetEnvoyFleets} from '@models/api';

import {useAppDispatch} from '@redux/hooks';
import {selectEnvoyFleet} from '@redux/reducers/main';

import {ContentWrapper, ErrorLabel} from '@components/AntdCustom';

import EnvoyFleetsListTable from './EnvoyFleetsListTable';

import * as S from './styled';

const {Option} = S.Select;

const EnvoyFleetsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectedNamespace, setSelectedNamespace] = useState<string>();

  const {data, error, loading} = useGetEnvoyFleets({queryParams: {namespace: selectedNamespace}});

  const envoyFleetsNamespaces = useMemo((): string[] => {
    if (!data) {
      return [];
    }

    const namespaces = data.map(envoyFleetItem => envoyFleetItem.namespace);

    return [...Array.from(new Set(namespaces))];
  }, [data]);

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
      <S.TitleContainer>
        <S.TitleLabel>Envoy Fleets</S.TitleLabel>

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
              {envoyFleetsNamespaces.map(namespace => (
                <Option key={namespace} value={namespace}>
                  {namespace}
                </Option>
              ))}
            </S.Select>
          )}
        </S.TitleFiltersContainer>
      </S.TitleContainer>

      {loading ? (
        <Skeleton />
      ) : error ? (
        <ErrorLabel>{error.message}</ErrorLabel>
      ) : (
        data && <EnvoyFleetsListTable envoyFleets={data} />
      )}
    </ContentWrapper>
  );
};

export default EnvoyFleetsList;
