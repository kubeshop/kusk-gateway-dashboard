import {Button, Input, Select, Table, Typography} from 'antd';

import {DownCircleOutlined, RightCircleOutlined} from '@ant-design/icons';

import YAML from 'yaml';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';
import {useGetApiCrdQuery} from '@redux/services/enhancedApi';

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
    title: 'ROUTE',
    dataIndex: 'route',
    key: 'route',
  },
  {
    title: 'METHODS',
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
  const selectedAPI = useAppSelector(state => state.main.selectedApi);

  const {data} = useGetApiCrdQuery({
    name: selectedAPI?.name || '',
    namespace: selectedAPI?.namespace || '',
  });

  const openapiSpec = (data as any)?.spec?.spec && YAML.parse((data as any)?.spec.spec);
  const dataSource = Object.keys(openapiSpec?.paths || {}).map(path => {
    return {
      key: path,
      route: path,
      methods: Object.keys(openapiSpec.paths[path]).join(','),
      source: '',
    };
  });

  return (
    <>
      <Typography.Title>Routes</Typography.Title>

      <S.Options>
        <S.FiltersWrapper>
          <Input placeholder="Route" />
          <Select placeholder="Filter by method">
            {METHODS.map(method => (
              <Select.Option key={method} value={method}>
                {method.toUpperCase()}
              </Select.Option>
            ))}
          </Select>
          <Select placeholder="Filter by source" />
        </S.FiltersWrapper>

        <Button type="primary">Add a new route</Button>
      </S.Options>

      <Table
        expandable={{
          expandIcon,
        }}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  );
};
export default ApiRoutes;
