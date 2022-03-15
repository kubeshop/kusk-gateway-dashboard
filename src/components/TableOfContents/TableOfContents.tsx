import React, {useEffect, useState} from 'react';

import {DataNode} from 'antd/lib/tree';

import {DownOutlined} from '@ant-design/icons';

import {SUPPORTED_METHODS} from '@constants/constants';

import {TableOfContentsItem} from '@models/swaggerUI';

import {getOperationId} from '@swaggerUI/utils/operations';

import TableOfContentsLabel from './TableOfContentsLabel';

import * as S from './styled';

interface IProps {
  layoutActions: any;
  spec: any;
}

const tableOfContentsScrollToElement = (content: TableOfContentsItem, layoutActions: any) => {
  const {operationElementRef, operationId, tag} = content;

  if (!operationElementRef) {
    return;
  }

  const operationElement = document.getElementById(operationElementRef);

  if (!operationElement) {
    return;
  }

  // if operation expanded, scroll to operation summary
  if (operationElement.classList.contains('is-open')) {
    operationElement.scrollIntoView({behavior: 'smooth'});
  } else {
    // expand the operation and the scroll to operation summary
    layoutActions.show(['operations', tag || 'default', operationId], true);

    setTimeout(() => {
      operationElement.scrollIntoView({behavior: 'smooth'});
    }, 100);
  }
};

const createTableOfContentsTreeData = (spec: any, layoutActions: any): DataNode[] => {
  let treeData: DataNode[] = [];

  treeData.push({
    key: 'root',
    className: 'tree-root-object',
    title: (
      <S.ContentLabel $level="top">
        <TableOfContentsLabel
          kuskExtensionRef={spec['x-kusk'] ? 'top-level-extension' : ''}
          level="top"
          path="Root object"
        />
      </S.ContentLabel>
    ),
    children: Object.entries(spec.paths).map((pathEntry: [string, any]) => {
      const [path, pathValue] = pathEntry;
      const pathId = path.substring(1).replaceAll('{', '').replaceAll('}', '').replaceAll('/', '-');

      return {
        key: path,
        title: (
          <S.ContentLabel $level="path">
            <TableOfContentsLabel kuskExtensionRef={pathValue['x-kusk'] ? pathId : ''} level="path" path={path} />
          </S.ContentLabel>
        ),
        children: Object.entries(pathValue)
          .filter(entry => SUPPORTED_METHODS.includes(entry[0]))
          .flatMap((operationEntry: [string, any]) => {
            const [operation, operationValue] = operationEntry;

            const deprecated = operationValue['deprecated'];
            const operationId = getOperationId(path, operation, operationValue);

            const tags: string[] = operationValue.tags || ['default'];

            return tags.map((tag: string) => {
              let kuskExtensionRef: string = '';

              if (operationValue['x-kusk']) {
                kuskExtensionRef = `operations-${tag}-${operationId}`;
              }

              const operationTagNodeContent: TableOfContentsItem = {
                label: (
                  <TableOfContentsLabel
                    deprecated={deprecated}
                    kuskExtensionRef={kuskExtensionRef}
                    level="operation"
                    operation={operation}
                    path={path}
                    tag={tag}
                  />
                ),
                operationId,
                operationElementRef: `operations-${tag}-${operationId}`,
                tag,
              };

              return {
                key: operationId,
                title: (
                  <S.ContentLabel
                    $level="operation"
                    $ref={operationTagNodeContent.operationElementRef || ''}
                    onClick={() => tableOfContentsScrollToElement(operationTagNodeContent, layoutActions)}
                  >
                    {operationTagNodeContent.label}
                  </S.ContentLabel>
                ),
              };
            });
          }),
      };
    }),
  });

  return treeData;
};

const TableOfContents: React.FC<IProps> = props => {
  const {layoutActions, spec} = props;

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [tableContentStatus, setTableContentStatus] = useState<'collapsed' | 'expanded'>('expanded');

  const treeData = createTableOfContentsTreeData(spec, layoutActions);

  useEffect(() => {
    if (!treeData) {
      return;
    }

    if (treeData[0].children?.length && tableContentStatus === 'expanded') {
      const treePathsKeys = treeData[0].children?.map(pathNode => pathNode.key);

      setExpandedKeys(['root', ...treePathsKeys]);
      return;
    }

    setExpandedKeys(['root']);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableContentStatus]);

  if (!treeData) {
    return null;
  }

  return (
    <S.TableOfContentsContainer>
      <S.TableOfContentsTitle>
        Table of contents
        <S.ExpandCollapseButton
          type="ghost"
          onClick={() => {
            if (tableContentStatus === 'collapsed') {
              setTableContentStatus('expanded');
            } else {
              setTableContentStatus('collapsed');
            }
          }}
        >
          {tableContentStatus === 'collapsed' ? 'Expand all' : 'Colapse all'}
        </S.ExpandCollapseButton>
      </S.TableOfContentsTitle>

      <S.ContentContainer>
        <S.Tree
          expandedKeys={expandedKeys}
          showLine={{showLeafIcon: false}}
          showIcon={false}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
          onExpand={expandedKeysValue => {
            if (!expandedKeysValue.length || expandedKeysValue.length === 1) {
              setTimeout(() => setTableContentStatus('collapsed'), 200);
            }

            if (expandedKeysValue.length - 1 === treeData[0].children?.length) {
              setTimeout(() => setTableContentStatus('expanded'), 200);
            }

            setExpandedKeys(expandedKeysValue);
          }}
        />
      </S.ContentContainer>
    </S.TableOfContentsContainer>
  );
};

export default TableOfContents;
