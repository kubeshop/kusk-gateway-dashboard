import React, {useEffect, useState} from 'react';

import {DataNode} from 'antd/lib/tree';

import {DownOutlined} from '@ant-design/icons';

import {SUPPORTED_METHODS} from '@constants/constants';

import {TableOfContentsItem} from '@models/swaggerUI';

import TableOfContentsLabel from './TableOfContentsLabel';

import * as S from './styled';

interface IProps {
  layoutActions: any;
  spec: any;
}

const tableOfContentsScrollToElement = (content: TableOfContentsItem, layoutActions: any) => {
  const {operationElementRef, operationId, tag} = content;

  if (operationElementRef) {
    // if operation expanded, scroll to operation summary
    if (document.getElementById(operationElementRef)?.classList.contains('is-open')) {
      document.getElementById(operationElementRef)?.scrollIntoView({behavior: 'smooth'});
    } else {
      // expand the operation and the scroll to operation summary
      layoutActions.show(['operations', tag || 'default', operationId], true);

      setTimeout(() => {
        document.getElementById(operationElementRef)?.scrollIntoView({behavior: 'smooth'});
      }, 200);
    }
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
          containsKuskExtension={spec['x-kusk']}
          kuskExtensionRef={spec['x-kusk'] ? 'top-level-extension' : ''}
          level="top"
          path="Root object"
        />
      </S.ContentLabel>
    ),
    children: Object.entries(spec.paths).map((pathEntry: [string, any]) => {
      const [path, pathValue] = pathEntry;

      return {
        key: path,
        title: (
          <S.ContentLabel $level="path">
            <TableOfContentsLabel containsKuskExtension={pathValue['x-kusk']} level="path" path={path} />
          </S.ContentLabel>
        ),
        children: Object.entries(pathValue)
          .filter(entry => SUPPORTED_METHODS.includes(entry[0]))
          .flatMap((operationEntry: [string, any]) => {
            const [operation, operationValue] = operationEntry;

            const reconstructedPath = path.substring(1).replaceAll('{', '').replaceAll('}', '');

            const deprecated = operationValue['deprecated'];
            let reconstructedPathId = reconstructedPath.replaceAll('/', '__');
            const reconstructedPathRef = reconstructedPath.replaceAll('/', '-');

            if (operationValue.parameters) {
              reconstructedPathId += '_';
            }

            let kuskExtensionRef: string = '';
            const operationId: string = operationValue['operationId'] || `${operation}_${reconstructedPathId}`;

            if (operationValue['x-kusk']) {
              kuskExtensionRef = `${reconstructedPathRef}-${operation}-extension`;
            }

            let tags: string[];

            if (operationValue.tags && operationValue.tags.length) {
              tags = operationValue.tags;
            } else {
              tags = ['default'];
            }

            return tags.map((tag: string) => {
              const operationTagNodeContent: TableOfContentsItem = {
                label: (
                  <TableOfContentsLabel
                    containsKuskExtension={Boolean(kuskExtensionRef)}
                    deprecated={deprecated}
                    kuskExtensionRef={kuskExtensionRef}
                    layoutActions={layoutActions}
                    level="operation"
                    operation={operation}
                    operationId={operationId}
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
