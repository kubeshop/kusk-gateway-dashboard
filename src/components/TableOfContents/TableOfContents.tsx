import React, {LegacyRef, useCallback, useEffect, useState} from 'react';
import {ResizableBox} from 'react-resizable';
import useMeasure from 'react-use/lib/useMeasure';

import {DataNode} from 'antd/lib/tree';

import {DownOutlined} from '@ant-design/icons';

import {SUPPORTED_METHODS} from '@constants/constants';

import {TableOfContentsItem} from '@models/swaggerUI';

import {getOperationId} from '@swaggerUI/utils/operations';
import {getPathId} from '@swaggerUI/utils/path';

import TableOfContentsLabel from './TableOfContentsLabel';

import * as S from './styled';

interface IProps {
  layoutActions: any;
  spec: any;
}

const TableOfContents: React.FC<IProps> = props => {
  const {layoutActions, spec} = props;

  const [containerRef] = useMeasure<HTMLDivElement>();

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [tableContentStatus, setTableContentStatus] = useState<'collapsed' | 'expanded'>('expanded');

  const treeData = createTableOfContentsTreeData(spec, layoutActions);

  const resizableHandler = useCallback(
    (_h: number, ref: LegacyRef<HTMLSpanElement>) => <span className="toc-custom-handle" ref={ref} />,
    []
  );

  const onCollapseExpandButtonClickHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    if (tableContentStatus === 'collapsed') {
      setTableContentStatus('expanded');
    } else {
      setTableContentStatus('collapsed');
    }
  };

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

  if (!treeData.length) {
    return null;
  }

  return (
    <S.Collapse defaultActiveKey="1">
      <S.Panel header="Table of contents" key="1">
        <S.ContentContainer ref={containerRef}>
          <ResizableBox
            // Infinity as a placeholder because value 100% is not allowed
            // by ResizableBox on the width property ( number required )
            width={Infinity}
            height={500}
            minConstraints={[Infinity, 300]}
            maxConstraints={[Infinity, 850]}
            axis="y"
            resizeHandles={['s']}
            handle={resizableHandler}
          >
            <S.TreeContainer>
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
              <S.CollapseTreeButton type="default" onClick={onCollapseExpandButtonClickHandler}>
                {tableContentStatus === 'collapsed' ? 'Expand operations' : 'Collapse operations'}
              </S.CollapseTreeButton>
            </S.TreeContainer>
          </ResizableBox>
        </S.ContentContainer>
      </S.Panel>
    </S.Collapse>
  );
};

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
    }, 150);
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
      const pathId = getPathId(path);

      return {
        key: pathId,
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
              const reconstructedTag = tag.replaceAll(' ', '_');

              if (operationValue['x-kusk']) {
                kuskExtensionRef = `operations-${reconstructedTag}-${operationId}`;
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
                operationElementRef: `operations-${reconstructedTag}-${
                  operationValue['operationId'] ? operationId.replaceAll('/', '\\/') : operationId
                }`,
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

export default TableOfContents;
