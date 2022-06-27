import {useMemo} from 'react';

import {Skeleton} from 'antd';

import {useGetServicesQuery} from '@redux/services/enhancedApi';
import {ApiItem} from '@redux/services/kuskApi';

import * as S from './ApisListTableServicesTag.styled';

interface IProps {
  api: ApiItem;
  apiKey: string;
  selectedApiKey: string;
}

const ApisListTableServicesTag: React.FC<IProps> = props => {
  const {api, apiKey, selectedApiKey} = props;

  const {data: services = [], ...servicesInfo} = useGetServicesQuery({});

  const service = useMemo(() => {
    if (!Array.isArray(services)) {
      return undefined;
    }

    return services.find(s => s.name === api.service.name && s.namespace === api.service.namespace);
  }, [api.service.name, api.service.namespace, services]);

  return (
    <S.Container>
      {servicesInfo.isLoading ? (
        <Skeleton.Button />
      ) : servicesInfo.error || !service || service.status === 'unavailable' ? (
        <S.FalseTag>Unavailable</S.FalseTag>
      ) : (
        service?.status === 'available' && <S.TrueTag>Available</S.TrueTag>
      )}

      <S.RightOutlined $disabled={apiKey === selectedApiKey} />
    </S.Container>
  );
};

export default ApisListTableServicesTag;
