import {useEffect, useState} from 'react';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

interface ApisTableDataSourceItem {
  key: string;
  name: string;
  namespace: string;
}

const columns = [
  {title: 'Name', dataIndex: 'name', key: 'name', width: '50%'},
  {title: 'Namespace', dataIndex: 'namespace', key: 'namespace', width: '50%'},
];

const APIs: React.FC = () => {
  const apis = useAppSelector(state => state.main.selectedEnvoyFleet?.apis);

  const [dataSource, setDataSource] = useState<ApisTableDataSourceItem[]>([]);

  useEffect(() => {
    if (!apis?.length) {
      return;
    }

    let tableDataSource: ApisTableDataSourceItem[] = apis.map(api => ({
      key: `${api.namespace}-${api.name}`,
      name: api.name,
      namespace: api.namespace,
    }));

    setDataSource(tableDataSource);
  }, [apis]);

  if (!apis?.length) {
    return null;
  }

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} size="small" />;
};

export default APIs;
