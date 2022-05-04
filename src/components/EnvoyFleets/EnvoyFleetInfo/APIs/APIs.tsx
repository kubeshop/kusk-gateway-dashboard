import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';

import {getApiKey} from '@utils/api';

import * as S from './styled';

const columns = [
  {title: 'Name', dataIndex: 'name', key: 'name', width: '50%'},
  {title: 'Namespace', dataIndex: 'namespace', key: 'namespace', width: '50%'},
];

const APIs: React.FC = () => {
  const dispatch = useAppDispatch();
  const apis = useAppSelector(state => state.main.apis);
  const envoyFleetApis = useAppSelector(state => state.main.selectedEnvoyFleet?.apis);

  const navigate = useNavigate();

  const dataSource = useMemo(() => {
    if (!envoyFleetApis?.length) {
      return [];
    }

    return envoyFleetApis.map(envoyFleetApi => ({
      key: getApiKey(envoyFleetApi),
      name: envoyFleetApi.name,
      namespace: envoyFleetApi.namespace,
    }));
  }, [envoyFleetApis]);

  if (!envoyFleetApis?.length) {
    return null;
  }

  return (
    <S.Table
      onRow={(record: {[key: string]: any}) => ({
        onClick: () => {
          const {key} = record;
          const foundAPI = apis.find(api => getApiKey(api) === key);

          if (foundAPI) {
            navigate('/');
            dispatch(selectApi(foundAPI));
          }
        },
      })}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="small"
    />
  );
};

export default APIs;
