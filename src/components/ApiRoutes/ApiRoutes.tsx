import {Button, Input, Select, Table, Typography} from 'antd';

import {DownCircleOutlined, RightCircleOutlined} from '@ant-design/icons';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1);

const expandIcon = ({expanded, onExpand, record}: any) =>
  expanded ? (
    <DownCircleOutlined style={{marginRight: 16}} onClick={e => onExpand(record, e)} />
  ) : (
    <RightCircleOutlined style={{marginRight: 16}} onClick={e => onExpand(record, e)} />
  );
const columns = [
  {
    title: 'PATH',
    dataIndex: 'route',
    key: 'route',
  },
  {
    title: 'OPERATIONS',
    dataIndex: 'methods',
    key: 'methods',
    render: (_: any, {methods}: any) => (
      <>
        {methods.split(',').map((method: string) => (
          <S.Tag key={method} $method={method}>
            {method.toUpperCase()}
          </S.Tag>
        ))}
      </>
    ),
  },
  {
    title: 'SOURCE',
    dataIndex: 'source',
    key: 'source',
  },
];

const ApiRoutes = () => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);

  const dataSource = Object.keys(selectedAPIOpenSpec?.paths || {}).map(path => {
    return {
      key: path,
      route: path,
      methods: Object.keys(selectedAPIOpenSpec.paths[path]).join(','),
      source: '',
    };
  });

  return (
    <S.Container>
      <Typography.Title>Paths</Typography.Title>

      <S.Options>
        <S.FiltersWrapper>
          <Input placeholder="Path" />
          <Select placeholder="Filter by operation">
            {METHODS.map(method => (
              <Select.Option key={method} value={method}>
                {method.toUpperCase()}
              </Select.Option>
            ))}
          </Select>
          <Select placeholder="Filter by source" />
        </S.FiltersWrapper>

        <Button type="primary" size="large">
          Add a new route
        </Button>
      </S.Options>

      <Table
        expandable={{
          expandIcon,
        }}
        columns={columns}
        dataSource={dataSource}
      />
    </S.Container>
  );
};
export default ApiRoutes;
