import {useEffect, useState} from 'react';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

interface StaticRoutesTableDataSourceItem {
  key: string;
  name: string;
  namespace: string;
}

const columns = [
  {title: 'Name', dataIndex: 'name', key: 'name', width: '50%'},
  {title: 'Namespace', dataIndex: 'namespace', key: 'namespace', width: '50%'},
];

const StaticRoutes: React.FC = () => {
  const staticRoutes = useAppSelector(state => state.main.selectedEnvoyFleet?.staticRoutes);

  const [dataSource, setDataSource] = useState<StaticRoutesTableDataSourceItem[]>([]);

  useEffect(() => {
    if (!staticRoutes?.length) {
      return;
    }

    let tableDataSource: StaticRoutesTableDataSourceItem[] = staticRoutes.map(staticRoute => ({
      key: `${staticRoute.namespace}-${staticRoute.name}`,
      name: staticRoute.name,
      namespace: staticRoute.namespace,
    }));

    setDataSource(tableDataSource);
  }, [staticRoutes]);

  if (!staticRoutes?.length) {
    return null;
  }

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} size="small" />;
};

export default StaticRoutes;
