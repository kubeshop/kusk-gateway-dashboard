import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectStaticRoute} from '@redux/reducers/main';

import {getStaticRouteKey} from '@utils/staticRoute';

import * as S from './styled';

const columns = [
  {title: 'Name', dataIndex: 'name', key: 'name', width: '50%'},
  {title: 'Namespace', dataIndex: 'namespace', key: 'namespace', width: '50%'},
];

const StaticRoutes: React.FC = () => {
  const dispatch = useAppDispatch();
  const envoyFleetStaticRoutes = useAppSelector(state => state.main.selectedEnvoyFleet?.staticRoutes);
  const staticRoutes = useAppSelector(state => state.main.staticRoutes);

  const navigate = useNavigate();

  const dataSource = useMemo(() => {
    if (!envoyFleetStaticRoutes?.length) {
      return [];
    }

    return envoyFleetStaticRoutes.map(({name, namespace}) => ({key: `${namespace}-${name}`, name, namespace}));
  }, [envoyFleetStaticRoutes]);

  const onRowClickHandler = (record: any) => {
    const {key} = record;
    const foundStaticRoute = staticRoutes.find(staticRoute => getStaticRouteKey(staticRoute) === key);

    if (foundStaticRoute) {
      navigate('/static-routes');
      dispatch(selectStaticRoute(foundStaticRoute));
    }
  };

  if (!staticRoutes?.length) {
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

export default StaticRoutes;
