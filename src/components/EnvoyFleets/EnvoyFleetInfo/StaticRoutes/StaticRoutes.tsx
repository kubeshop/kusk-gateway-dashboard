import {useMemo} from 'react';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

const columns = [
  {title: 'Name', dataIndex: 'name', key: 'name', width: '50%'},
  {title: 'Namespace', dataIndex: 'namespace', key: 'namespace', width: '50%'},
];

const StaticRoutes: React.FC = () => {
  const staticRoutes = useAppSelector(state => state.main.selectedEnvoyFleet?.staticRoutes);

  const dataSource = useMemo(() => {
    if (!staticRoutes?.length) {
      return [];
    }

    return staticRoutes.map(staticRoute => ({
      key: `${staticRoute.namespace}-${staticRoute.name}`,
      name: staticRoute.name,
      namespace: staticRoute.namespace,
    }));
  }, [staticRoutes]);

  if (!staticRoutes?.length) {
    return null;
  }

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} size="small" />;
};

export default StaticRoutes;
