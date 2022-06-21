import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTracking} from 'react-tracking';

import {ANALYTIC_TYPE, Events} from '@models/analytics';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';
import {useGetApisQuery} from '@redux/services/enhancedApi';

import {getApiKey} from '@utils/api';

import * as S from './styled';

const columns = [
  {title: 'Name', dataIndex: 'name', key: 'name', width: '50%'},
  {title: 'Namespace', dataIndex: 'namespace', key: 'namespace', width: '50%'},
];

const APIs: React.FC = () => {
  useTracking({eventName: Events.ENVOY_FLEET_API_LOADED, type: ANALYTIC_TYPE.ACTION}, {dispatchOnMount: true});
  const dispatch = useAppDispatch();
  const {data: apis = []} = useGetApisQuery({});
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

  const onRowClickHandler = (record: any) => {
    const {key} = record;
    const foundAPI = apis.find(api => getApiKey(api) === key);

    if (foundAPI) {
      navigate('/');
      dispatch(selectApi(foundAPI));
    }
  };

  if (!envoyFleetApis?.length) {
    return null;
  }

  return (
    <S.Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="small"
      onRow={(record: {[key: string]: any}) => ({
        onClick: () => onRowClickHandler(record),
      })}
    />
  );
};

export default APIs;
