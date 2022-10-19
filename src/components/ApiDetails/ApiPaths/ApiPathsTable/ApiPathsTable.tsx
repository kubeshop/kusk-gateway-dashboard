import {FormEvent, useState} from 'react';

import {Input, Select, Table} from 'antd';

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
];

const ApiPathsTable = () => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [filterPath, setFilterPath] = useState('');
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];
  const target = xKusk?.upstream || xKusk?.redirect;
  const type: TargetType = target?.service ? 'service' : target?.host ? 'host' : target ? 'redirect' : 'mocked';

  const dataSource = Object.keys(selectedAPIOpenSpec?.paths || {})
    .filter(i => i.includes(filterPath))
    .map(path => {
      return {
        key: path,
        route: path,
        methods: Object.keys(selectedAPIOpenSpec.paths[path])
          .filter(i => METHODS.includes(i))
          .filter(i => i.includes(selectedMethod))
          .join(','),
        source: type,
      };
    })
    .filter(i => i.source.includes(selectedSource) && i.methods.includes(selectedMethod));

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

      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </S.Container>
  );
};
export default ApiPathsTable;
