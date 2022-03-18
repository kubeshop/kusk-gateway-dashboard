import {Skeleton} from 'antd';

import {ApiItem, useGetService} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';

import * as S from './ApisListTableServicesTag.styled';

interface IProps {
  api: ApiItem;
  apiKey: string;
}

const ApisListTableServicesTag: React.FC<IProps> = props => {
  const {api, apiKey} = props;

  const dispatch = useAppDispatch();
  const selectedApiKey = useAppSelector(state => {
    const {selectedApi} = state.main;

    if (!selectedApi) {
      return null;
    }

    return `${selectedApi?.namespace}-${selectedApi?.name}`;
  });

  const {data, error, loading} = useGetService({name: api.service.name, namespace: api.service.namespace});

  return (
    <S.Container>
      {loading ? (
        <Skeleton.Button />
      ) : error || data?.status === 'unavailable' ? (
        <S.FalseTag>Unavailable</S.FalseTag>
      ) : (
        data?.status === 'available' && <S.TrueTag>Available</S.TrueTag>
      )}

      <S.RightOutlined
        $disabled={apiKey === selectedApiKey}
        onClick={() => {
          if (!selectedApiKey || apiKey !== selectedApiKey) {
            dispatch(selectApi(api));
          }
        }}
      />
    </S.Container>
  );
};

export default ApisListTableServicesTag;
