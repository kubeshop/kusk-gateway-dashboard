import {useMemo} from 'react';

import {useAppSelector} from '@redux/hooks';

import {getApiKey} from '@utils/api';

import * as S from './styled';

const columns = [
  {title: 'Name', dataIndex: 'name', key: 'name', width: '50%'},
  {title: 'Namespace', dataIndex: 'namespace', key: 'namespace', width: '50%'},
];

const APIs: React.FC = () => {
  const apis = useAppSelector(state => state.main.selectedEnvoyFleet?.apis);

  const dataSource = useMemo(() => {
    if (!apis?.length) {
      return [];
    }

    return apis.map(api => ({
      key: getApiKey(api),
      name: api.name,
      namespace: api.namespace,
    }));
  }, [apis]);

  if (!apis?.length) {
    return null;
  }

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} size="small" />;
};

export default APIs;
