import {DataNode} from 'antd/lib/tree';

import {DownOutlined} from '@ant-design/icons';

import * as S from './KuskExtensionsPanelContent.styled';

interface IProps {
  kuskExtension: {[key: string]: any};
  path: string;
}

const createExtensionTreeNode = (key: string, children: any): DataNode => {
  let propertyValue = null;

  if (typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean') {
    propertyValue = children;
  } else if (Object.keys(children)[0] === '0') {
    propertyValue = JSON.stringify(children);
  }

  let title: JSX.Element = (
    <S.ExtensionLabel $hasChildren={children && typeof children === 'object'}>
      {key}
      {propertyValue?.toString() && (
        <>
          : <S.ExtensionValueLabel>{propertyValue.toString()}</S.ExtensionValueLabel>
        </>
      )}
    </S.ExtensionLabel>
  );

  const node: DataNode = {
    key,
    title,
    children: [],
  };

  if (children && Object.keys(children)[0] !== '0') {
    node.children = Object.entries(children).map(([k, c]) => createExtensionTreeNode(k, c));
  }

  return node;
};

const KuskExtensionsPanelContent: React.FC<IProps> = props => {
  const {kuskExtension, path} = props;
  const treeData = Object.entries(kuskExtension).map(([key, children]) => createExtensionTreeNode(key, children));

  let title: JSX.Element = <S.ExtensionLabel $hasChildren>{path.toString()}</S.ExtensionLabel>;

  const root: DataNode[] = [
    {
      key: path,
      title,
      children: treeData,
    },
  ];

  return (
    <S.Tree
      multiple
      defaultExpandAll
      selectable={false}
      showLine={{showLeafIcon: false}}
      showIcon={false}
      switcherIcon={<DownOutlined />}
      treeData={root}
    />
  );
};

export default KuskExtensionsPanelContent;
