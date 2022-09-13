import {MouseEvent, Suspense} from 'react';
import {useDispatch} from 'react-redux';

import {Button, Table, Typography} from 'antd';

import {RightOutlined} from '@ant-design/icons';

import {useAppSelector} from '@redux/hooks';
import {selectStaticRoutePath} from '@redux/reducers/main';
import {openStaticRoutePathModal} from '@redux/reducers/ui';

import {MethodTag, SubHeading} from '@components/AntdCustom';

import AddPathModal from './AddPathModal/AddPathModal';

import * as S from './styled';

const columns = [
  {
    title: 'PATH',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: 'OPERATIONS',
    dataIndex: 'methods',
    key: 'methods',
    render: (args: any, {methods}: any) =>
      methods.map((method: string) => (
        <MethodTag key={method} $method={method}>
          {method}
        </MethodTag>
      )),
  },
  {
    title: '',
    dataIndex: 'details',
    key: 'details',
    render: (args: any, {path}: any) => <RightOutlined key={path} style={{display: 'block'}} />,
  },
];

const Paths = () => {
  const dispatch = useDispatch();
  const routeSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);
  const isStaticRoutePathModalVisible = useAppSelector(state => state.ui.staticRoutePathModal.isOpen);

  const dataSource = Object.keys(routeSpec?.spec?.paths || []).map(path => ({
    path,
    methods: Object.keys(routeSpec.spec.paths[path]),
  }));

  const onAddPathClickHandler = () => {
    dispatch(openStaticRoutePathModal());
  };

  return (
    <>
      <S.Header>
        <div>
          <Typography.Title>Paths</Typography.Title>
          <SubHeading>
            Define manually configured routing rules.&nbsp;
            <Typography.Link>Learn more about static routes </Typography.Link>
          </SubHeading>
        </div>
        <Button type="primary" size="large" onClick={onAddPathClickHandler}>
          Add new path
        </Button>
      </S.Header>
      <Table
        rowKey="path"
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        onRow={record => {
          return {
            onClick: (event: MouseEvent) => {
              event.stopPropagation();
              dispatch(selectStaticRoutePath(record.path));
            },
          };
        }}
      />

      <Suspense fallback={null}>{isStaticRoutePathModalVisible && <AddPathModal />}</Suspense>
    </>
  );
};
export default Paths;
