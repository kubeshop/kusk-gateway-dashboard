import {FormEvent, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Input, Select, Table} from 'antd';

import {DownCircleOutlined, RightCircleOutlined, RightOutlined} from '@ant-design/icons';

import _ from 'lodash';

import {SUPPORTED_METHODS} from '@constants/constants';

import {TargetType} from '@models/ui';

import {useAppSelector} from '@redux/hooks';

import {TargetTag} from '@components/AntdCustom';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1);

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
    render: (arg: any, {methods}: any) => (
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
    render: (arg: any, {source}: any) => (
      <TargetTag key={source} $type={source}>
        {_.capitalize(source)}
      </TargetTag>
    ),
  },
  {
    title: 'Policies applied',
    dataIndex: 'policiesCount',
    key: 'policiesCount',
  },
  {
    title: '',
    key: 'icon',
    render: () => <RightOutlined style={{marginLeft: 'auto'}} />,
  },
];

const expandIcon = ({expanded, onExpand, record}: any) => {
  return !record.route || record?.methods?.length === 0 ? null : expanded ? (
    <DownCircleOutlined
      style={{marginRight: 8}}
      onClick={e => {
        e?.stopPropagation();
        onExpand(record, e);
      }}
    />
  ) : (
    <RightCircleOutlined
      style={{marginRight: 8}}
      onClick={e => {
        e?.stopPropagation();
        onExpand(record, e);
      }}
    />
  );
};

const ApiPathsTable = () => {
  const navigate = useNavigate();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [filterPath, setFilterPath] = useState('');

  const dataSource = useMemo(() => {
    const root = {
      key: '.',
      route: 'Root',
      source: getSourceType(_.get(selectedAPIOpenSpec, 'x-kusk')),
      policiesCount: _.size(_.get(selectedAPIOpenSpec, 'x-kusk')),
      methods: '',
    };
    return [
      root,
      ...Object.keys(selectedAPIOpenSpec?.paths || {})
        .filter(i => i.includes(filterPath))
        .map(path => {
          return {
            key: `paths.${path}`,
            route: path,
            methods: Object.keys(selectedAPIOpenSpec.paths[path])
              .filter(i => METHODS.includes(i))
              .filter(i => i.includes(selectedMethod))
              .join(','),
            source: getSourceType(_.get(selectedAPIOpenSpec.paths, `${path}.x-kusk`)),
            policiesCount: _.size(_.get(selectedAPIOpenSpec.paths, `${path}.x-kusk`)),
            children: Object.keys(selectedAPIOpenSpec.paths[path])
              .filter(i => METHODS.includes(i))
              .filter(i => i.includes(selectedMethod))
              .map(m => {
                return {
                  key: `paths.${path}.${m}`,
                  methods: m,
                  source: getSourceType(_.get(selectedAPIOpenSpec.paths, `${path}.${m}.x-kusk`)),
                  policiesCount: _.size(_.get(selectedAPIOpenSpec.paths, `${path}.${m}.x-kusk`)),
                };
              }),
          };
        })
        .filter(i => i.source.includes(selectedSource) && i.methods.includes(selectedMethod)),
    ];
  }, [selectedAPIOpenSpec, filterPath, selectedSource, selectedMethod]);

  const onMethodSelectHandler = (value: string) => {
    setSelectedMethod(value || '');
  };

  const onSourceSelectHandler = (value: string) => {
    setSelectedSource(value || '');
  };

  const onFilterPathChange = (e: FormEvent<HTMLInputElement>) => {
    setFilterPath(e?.currentTarget?.value || '');
  };

  return (
    <S.Container>
      <S.Options>
        <S.FiltersWrapper>
          <Input placeholder="Path" allowClear onChange={onFilterPathChange} />
          <Select placeholder="Filter by operation" allowClear onChange={onMethodSelectHandler}>
            {METHODS.map(method => (
              <Select.Option key={method} value={method}>
                {method.toUpperCase()}
              </Select.Option>
            ))}
          </Select>

          <Select placeholder="Filter by source" allowClear onChange={onSourceSelectHandler}>
            <Select.Option value="mocked">Mocked</Select.Option>
            <Select.Option value="service">Upstream service</Select.Option>
            <Select.Option value="host">Upstream host</Select.Option>
            <Select.Option value="redirect">Redirect</Select.Option>
          </Select>
        </S.FiltersWrapper>
      </S.Options>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        expandable={{
          columnWidth: 24,
          rowExpandable: record => Boolean(record.route),
          expandIcon,
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              navigate(`paths/policies?p=${record.key}`, {});
            },
          };
        }}
      />
    </S.Container>
  );
};

const getSourceType = (xkusk: {[key: string]: any}): TargetType => {
  const target = xkusk?.upstream || xkusk?.redirect;

  return target?.service ? 'service' : target?.host ? 'host' : target ? 'redirect' : 'mocked';
};
export default ApiPathsTable;
