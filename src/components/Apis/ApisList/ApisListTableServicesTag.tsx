import {useMemo} from 'react';

import {Skeleton} from 'antd';

import {ApiItem} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import * as S from './ApisListTableServicesTag.styled';

interface IProps {
  api: ApiItem;
  apiKey: string;
  selectedApiKey: string;
}

const ApisListTableServicesTag: React.FC<IProps> = props => {
  const {api, apiKey, selectedApiKey} = props;

  const services = useAppSelector(state => state.main.services);

  const service = useMemo(
    () => services.items.find(s => s.name === api.service.name && s.namespace === api.service.namespace),
    [api.service.name, api.service.namespace, services.items]
  );

  return (
    <S.Container>
      {services.isLoading ? (
        <Skeleton.Button />
      ) : services.error || !service || service.status === 'unavailable' ? (
        <S.FalseTag>Unavailable</S.FalseTag>
      ) : (
        service?.status === 'available' && <S.TrueTag>Available</S.TrueTag>
      )}

      <S.RightOutlined $disabled={apiKey === selectedApiKey} />
    </S.Container>
  );
};

export default ApisListTableServicesTag;
