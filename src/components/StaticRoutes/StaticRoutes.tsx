import {Suspense, lazy} from 'react';
import {useDispatch} from 'react-redux';

import {Button, Table, Tag, Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {openStaticRouteModal} from '@redux/reducers/ui';
import {useGetStaticRoutesQuery} from '@redux/services/enhancedApi';

import {SubHeading} from '@components/AntdCustom';

import * as S from './styled';

const AddStaticRouteModal = lazy(() => import('@components/AddStaticRouteModal/AddStaticRouteModal'));

const columns = [
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
      <Typography.Link href={`/staticroute/${namespace}/${name}`}>View details</Typography.Link>
    ),
  },
];

const StaticRoutes = () => {
  const dispatch = useDispatch();
  const {data: staticRoutes} = useGetStaticRoutesQuery({});
  const isStaticRouteModalVisible = useAppSelector(state => state.ui.staticRouteModal.isOpen);

  const dataSource = staticRoutes?.map(staticRoute => ({
    ...staticRoute,
    deployment: {name: staticRoute.envoyFleetName, namespace: staticRoute.envoyFleetNamespace},
  }));

  const onAddStaticRouteClickHandler = () => {
    dispatch(openStaticRouteModal());
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <Typography.Title>Static Routes</Typography.Title>
          <SubHeading>
            Define manually configured routing rules.&nbsp;
            <Typography.Link href="https://docs.kusk.io/reference/customresources/staticroute">
              Learn more about static routes
            </Typography.Link>
          </SubHeading>
        </div>
        <Button type="primary" size="large" onClick={onAddStaticRouteClickHandler}>
          Add static route
        </Button>
      </S.Header>

      <Table rowKey="name" columns={columns} dataSource={dataSource} pagination={false} />
      <Suspense fallback={null}>{isStaticRouteModalVisible && <AddStaticRouteModal />}</Suspense>
    </S.Container>
  );
};

export default StaticRoutes;
