import {useMemo} from 'react';

import {StaticRouteItem} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectStaticRoute} from '@redux/reducers/main';

import {ListTableColumnLabel} from '@components';

import {getStaticRouteKey} from '@utils/staticRoute';

import * as S from './StaticRoutesListTable.styled';

interface IProps {
  staticRoutes: StaticRouteItem[];
}

const StaticRoutesListTable: React.FC<IProps> = props => {
  const {staticRoutes} = props;

  const dispatch = useAppDispatch();
  const selectedStaticRoute = useAppSelector(state => state.main.selectedStaticRoute);
  console.log(selectedStaticRoute);

  const dataSource = useMemo(() => {
    if (!staticRoutes?.length) {
      return [];
    }

    return staticRoutes.map(staticRoute => ({
      key: getStaticRouteKey(staticRoute),
      name: staticRoute.name,
      namespace: staticRoute.namespace,
      staticRouteItem: staticRoute,
    }));
  }, [staticRoutes]);

  const selectedStaticRouteKey = useMemo(() => getStaticRouteKey(selectedStaticRoute), [selectedStaticRoute]);

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (value: string, record: any) => (
          <ListTableColumnLabel itemKey={record.key} selectedKey={selectedStaticRouteKey} value={value} />
        ),
      },
      {
        title: 'Namespace',
        dataIndex: 'namespace',
        key: 'namespace',
        render: (value: string, record: any) => (
          <ListTableColumnLabel
            itemKey={record.key}
            selectedKey={selectedStaticRouteKey}
            value={value}
            showSelectArrow
            onSelectArrowClick={() => dispatch(selectStaticRoute(record.staticRouteItem))}
          />
        ),
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedStaticRouteKey]
  );

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} tableLayout="fixed" />;
};

export default StaticRoutesListTable;
