import {ChangeEvent, Dispatch, useMemo, useState} from 'react';

import {Dropdown, Input, Menu, Select, Typography} from 'antd';
import {Key} from 'antd/lib/table/interface';
import {DataNode} from 'antd/lib/tree';

import {MoreOutlined} from '@ant-design/icons';

import _, {flattenDeep} from 'lodash';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';

import {MethodTag} from '@components/AntdCustom';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1);

interface IProps {
  selectKey: Dispatch<Key[] | undefined>;
  onHidePath: (path: string, hide: boolean) => void;
}

const PathNavigator = ({selectKey, onHidePath}: IProps) => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);

  const [selectedMethod, setSelectedMethod] = useState('');
  const [filterPath, setFilterPath] = useState('');
  const pathTree = useMemo(() => {
    const paths = Object.keys(selectedAPIOpenSpec?.paths || {})
      .filter(p => p !== 'x-kusk')
      .filter(i => i.includes(filterPath))
      .map(path => {
        return {
          path,
          hidden:
            Boolean(selectedAPIOpenSpec.paths[path]['x-kusk']?.hidden) ||
            Boolean(_.find(selectedAPIOpenSpec.paths[path], el => el['x-kusk']?.hidden === true)),
          methods: Object.keys(selectedAPIOpenSpec.paths[path])
            .filter(k => SUPPORTED_METHODS.includes(k))
            .filter(i => METHODS.includes(i))
            .filter(i => i.includes(selectedMethod)),
        };
      });

    return [
      {
        title: 'Root',
        key: '.',
        children: paths.map(p => ({
          title: (
            <S.Path>
              <Typography.Text>{p.path}</Typography.Text>
              <Dropdown
                overlay={
                  <Menu
                    items={[
                      {
                        label: p.hidden ? 'Unhide' : 'Hide',
                        key: 'hidden',
                        onClick: ({domEvent}) => {
                          domEvent.stopPropagation();
                          onHidePath(p.path, !p.hidden);
                        },
                      },
                    ]}
                  />
                }
              >
                <MoreOutlined />
              </Dropdown>
            </S.Path>
          ),
          key: `paths.${p.path}`,

          style: {opacity: p.hidden ? 0.5 : 1},
          children: p.methods.map(method => ({
            title: (
              <MethodTag style={{marginTop: 8}} $method={method}>
                {method}
              </MethodTag>
            ),
            key: `paths.${p.path}.${method}`,
            style: {opacity: p.hidden ? 0.5 : 1},
          })),
        })),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAPIOpenSpec, filterPath, selectedMethod]);

  const [expandedKeys, setExpandedKeys] = useState(getAllKeys(pathTree));

  const onPathFilterChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterPath(e?.currentTarget?.value || '');
  };

  const onMethodSelectHandler = (value: string) => {
    setSelectedMethod(value || '');
  };

  const onExpand = (keys: Key[]) => {
    setExpandedKeys(keys);
  };

  const onSelectKeyClickHandler = (keys: Key[]) => {
    selectKey(keys);
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
      <S.Tree treeData={pathTree} onExpand={onExpand} expandedKeys={expandedKeys} onSelect={onSelectKeyClickHandler} />
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
