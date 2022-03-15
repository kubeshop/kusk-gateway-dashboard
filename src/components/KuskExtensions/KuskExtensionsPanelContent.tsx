import {DataNode} from 'antd/lib/tree';

import {DownOutlined} from '@ant-design/icons';

import * as S from './KuskExtensionsPanelContent.styled';

interface IProps {
  kuskExtension: {[key: string]: any};
}

const createExtensionTreeNode = (key: string, children: any): DataNode => {
  let propertyValue = null;

  if (typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean') {
    propertyValue = children;
  } else if (Object.keys(children)[0] === '0') {
    propertyValue = JSON.stringify(children);
  }

  let title: JSX.Element = (
    <div>
      {key}
      {propertyValue && (
        <>
          : <S.ExtensionValueLabel $type={typeof children}>{propertyValue.toString()}</S.ExtensionValueLabel>
        </>
      )}
    </div>
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
  const {kuskExtension} = props;

  const treeData = Object.entries(kuskExtension).map(([key, children]) => createExtensionTreeNode(key, children));

  return (
    <S.Tree
      multiple
      defaultExpandAll
      selectable={false}
      showLine={{showLeafIcon: false}}
      showIcon={false}
      switcherIcon={<DownOutlined />}
      treeData={treeData}
    />
  );
};

export default KuskExtensionsPanelContent;
