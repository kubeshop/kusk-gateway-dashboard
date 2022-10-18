import {ChangeEvent, useMemo, useState} from 'react';

import {Input, Select, Typography} from 'antd';
import {DataNode} from 'antd/lib/tree';

import {flattenDeep} from 'lodash';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';

import {MethodTag} from '@components/AntdCustom';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1);

const PathNavigator = () => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);

  const [selectedMethod, setSelectedMethod] = useState('');
  const [filterPath, setFilterPath] = useState('');

  const pathTree = useMemo(() => {
    const paths = Object.keys(selectedAPIOpenSpec?.paths || {})
      .filter(i => i.includes(filterPath))
      .map(path => {
        return {
          path,
          methods: Object.keys(selectedAPIOpenSpec.paths[path])
            .filter(i => METHODS.includes(i))
            .filter(i => i.includes(selectedMethod)),
        };
      });

    return [
      {
        title: 'Root',
        key: 'root',
        children: paths.map(p => ({
          title: (
            <div>
              <Typography.Text>{p.path}</Typography.Text>
            </div>
          ),
          key: p.path,
          children: p.methods.map(method => ({
            title: (
              <MethodTag style={{marginTop: 8}} $method={method}>
                {method}
              </MethodTag>
            ),
            key: `${p.path}-${method}`,
          })),
        })),
      },
    ];
  }, [selectedAPIOpenSpec, filterPath, selectedMethod]);

  const onPathFilterChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterPath(e?.currentTarget?.value || '');
  };

  const onMethodSelectHandler = (value: string) => {
    setSelectedMethod(value || '');
  };

  return (
    <S.Container>
      <S.Filters>
        <Input prefix={<S.SearchOutlinedIcon />} placeholder="Search by path" onChange={onPathFilterChangeHandler} />
        <S.Select allowClear placeholder="Filter by operation" onChange={onMethodSelectHandler}>
          {METHODS.map(method => (
            <Select.Option key={method} value={method}>
              {method.toUpperCase()}
            </Select.Option>
          ))}
        </S.Select>
      </S.Filters>
      <S.Tree treeData={pathTree} />
    </S.Container>
  );
};

const getAllKeys = (data: DataNode[]) => {
  const nestedKeys = data.map(node => {
    let childKeys: Array<string | number> = [];
    if (node.children) {
      childKeys = getAllKeys(node.children);
    }
    return [childKeys, node.key];
  });
  return flattenDeep(nestedKeys);
};
export default PathNavigator;
