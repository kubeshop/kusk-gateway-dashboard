import {Suspense, lazy} from 'react';
import {useDispatch} from 'react-redux';

import {Button, Modal, Table, Tag, Typography} from 'antd';
import {ColumnsType} from 'antd/lib/table';

import {AppRoutes} from '@constants/AppRoutes';

import {AlertEnum} from '@models/alert';

import {useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {openStaticRouteModal} from '@redux/reducers/ui';
import {useDeleteStaticRouteMutation, useGetStaticRoutesQuery} from '@redux/services/enhancedApi';
import {StaticRouteItem} from '@redux/services/kuskApi';

import {SubHeading} from '@components/AntdCustom';

import EmptyList from './EmptyList';

import * as S from './styled';

const AddStaticRouteModal = lazy(() => import('@components/AddStaticRouteModal/AddStaticRouteModal'));

interface StaticRouteRecord extends StaticRouteItem {
  deployment: {
    namespace: string | undefined;
    name: string | undefined;
  };
  deleteStaticRoute: (arg: {namespace: string; name: string}) => void;
}

const columns: ColumnsType<StaticRouteRecord> = [
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'NAMESPACE',
    dataIndex: 'namespace',
    key: 'namespace',
  },
  {
    title: 'DEPLOYMENT FLEET',
    dataIndex: 'deployment',
    key: 'deployment',
    render: (arg: any, {deployment}: any) => (
      <Typography.Text>
        <Tag>{deployment.namespace}</Tag>
        {deployment.name}
      </Typography.Text>
    ),
  },
  {
    title: '',
    dataIndex: 'details',
    key: 'details',
    render: (args: any, {name, namespace}: any) => (
      <Typography.Link href={`${AppRoutes.STATIC_ROUTE}/${namespace}/${name}`}>View details</Typography.Link>
    ),
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
    render: () => <Typography.Link>Delete</Typography.Link>,
    onCell: record => ({
      onClick: event => {
        event.stopPropagation();
        record.deleteStaticRoute({namespace: record.namespace, name: record.name});
      },
    }),
  },
];

const StaticRoutes = () => {
  const dispatch = useDispatch();
  const {data: staticRoutes} = useGetStaticRoutesQuery({});
  const [deleteStaticRoute] = useDeleteStaticRouteMutation();
  const isStaticRouteModalVisible = useAppSelector(state => state.ui.staticRouteModal.isOpen);

  const onDeleteStaticRoute = ({namespace, name}: {name: string; namespace: string}) => {
    Modal.confirm({
      title: `Delete ${name}`,
      content: `Are you sure you want to delete ${name}? 
      If you do so your application will be unreachable on this route. `,
      okText: 'Yes, delete',
      cancelText: 'Cancel',
      okType: 'danger',

      onOk: async () => {
        try {
          await deleteStaticRoute({namespace, name}).unwrap();
          dispatch(
            setAlert({
              title: 'Static route deleted successfully',
              description: `${name} was deleted successfully in ${namespace} namespace!`,
              type: AlertEnum.Success,
            })
          );
        } catch (e) {
          dispatch(
            setAlert({
              title: 'Static route has not deleted',
              description: `Something went wrong!`,
              type: AlertEnum.Error,
            })
          );
        }
      },
    });
  };

  const onAddStaticRouteClickHandler = () => {
    dispatch(openStaticRouteModal());
  };

  const dataSource: Array<StaticRouteRecord> =
    staticRoutes?.map((staticRoute: StaticRouteItem) => ({
      ...staticRoute,
      deployment: {name: staticRoute.envoyFleetName, namespace: staticRoute.envoyFleetNamespace},
      deleteStaticRoute: onDeleteStaticRoute,
    })) || [];

  const isEmptyDataSource = dataSource?.length === 0;

  return (
    <S.Container>
      <S.Header>
        <div>
          <Typography.Title>Static Routes</Typography.Title>
          {!isEmptyDataSource && (
            <SubHeading>
              Define manually configured routing rules.&nbsp;
              <Typography.Link href="https://docs.kusk.io/reference/customresources/staticroute">
                Learn more about static routes
              </Typography.Link>
            </SubHeading>
          )}
        </div>
        {!isEmptyDataSource && (
          <Button type="primary" onClick={onAddStaticRouteClickHandler}>
            Add static route
          </Button>
        )}
      </S.Header>

      {isEmptyDataSource ? (
        <EmptyList />
      ) : (
        <Table rowKey="name" columns={columns} dataSource={dataSource} pagination={false} />
      )}

      <Suspense fallback={null}>{isStaticRouteModalVisible && <AddStaticRouteModal />}</Suspense>
    </S.Container>
  );
};

export default StaticRoutes;
