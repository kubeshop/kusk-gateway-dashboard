import {ChangeEvent, Dispatch, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Input, Menu, Select, Typography} from 'antd';
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
  selectedKeys: Key[];
  selectKey: Dispatch<Key[]>;
  onHidePath: (path: string[], hide: boolean) => void;
}

const PathNavigator = ({selectedKeys, selectKey, onHidePath}: IProps) => {
  const navigate = useNavigate();
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
          disabled: Boolean(selectedAPIOpenSpec.paths[path]['x-kusk']?.disabled),
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
              <S.Dropdown
                overlay={
                  <Menu
                    items={[
                      {
                        label: p.disabled ? 'Enable' : 'Disable',
                        key: 'disabled',
                        onClick: ({domEvent}) => {
                          domEvent.stopPropagation();
                          onHidePath([`paths.${p.path}.x-kusk`], !p.disabled);
                        },
                      },
                    ]}
                  />
                }
              >
                <MoreOutlined />
              </S.Dropdown>
            </S.Path>
          ),
          key: `paths.${p.path}`,

          style: {opacity: p.disabled ? 0.5 : 1},
          children: p.methods.map(method => ({
            title: (
              <S.Path>
                <MethodTag style={{marginTop: 8}} $method={method}>
                  {method}
                </MethodTag>
                <S.Dropdown
                  overlay={
                    <Menu
                      items={[
                        {
                          label:
                            _.result<boolean>(selectedAPIOpenSpec, `paths.${p.path}.${method}.x-kusk.disabled`) ||
                            p.disabled
                              ? 'Enable'
                              : 'Disable',
                          key: 'disabled',
                          onClick: ({domEvent}) => {
                            domEvent.stopPropagation();
                            const currentState = _.result<boolean>(
                              selectedAPIOpenSpec,
                              `paths.${p.path}.${method}.x-kusk.disabled`
                            );
                            onHidePath([`paths.${p.path}.${method}.x-kusk`, `paths.${p.path}.x-kusk`], !currentState);
                          },
                        },
                      ]}
                    />
                  }
                >
                  <MoreOutlined />
                </S.Dropdown>
              </S.Path>
            ),
            key: `paths.${p.path}.${method}`,
            // disabled: _.result<boolean>(selectedAPIOpenSpec, `paths.${p.path}.${method}.x-kusk.disabled`) || p.disabled,
            style: {
              opacity:
                _.result<boolean>(selectedAPIOpenSpec, `paths.${p.path}.${method}.x-kusk.disabled`) || p.disabled
                  ? 0.5
                  : 1,
            },
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

  const onSelectKeyClickHandler = (keys: Key[], {selected}: {selected: boolean}) => {
    if (selected) {
      selectKey(keys);
      navigate(`paths/policies?p=${keys[0].toString()}`);
    }
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
      <S.Tree
        treeData={pathTree}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onSelect={onSelectKeyClickHandler}
      />
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
