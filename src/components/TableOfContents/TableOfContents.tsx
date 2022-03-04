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
  const {kuskExtensionRef, operationElementId, operationId, tag} = content;

  if (operationElementId) {
    // if operation expanded, scroll to operation summary
    if (document.getElementById(operationElementId)?.classList.contains('is-open')) {
      document.getElementById(operationElementId)?.scrollIntoView({behavior: 'smooth'});
    } else {
      // expand the operation and the scroll to operation summary
      layoutActions.show(['operations', tag || 'default', operationId], true);

      setTimeout(() => {
        document.getElementById(operationElementId)?.scrollIntoView({behavior: 'smooth'});
      }, 200);
    }
  } else if (kuskExtensionRef) {
    document.getElementById(kuskExtensionRef)?.scrollIntoView({behavior: 'smooth'});
  }
};

const createTableOfContentsTreeData = (spec: any, layoutActions: any): DataNode[] => {
  let treeData: DataNode[] = [];

  const rootNodeContent: TableOfContentsItem = {
    label: (
      <TableOfContentsLabel
        containsKuskExtension={spec['x-kusk']}
        kuskExtensionRef={spec['x-kusk'] ? 'top-level-extension' : ''}
        level="top"
        path="Root object"
      />
    ),
    kuskExtensionRef: spec['x-kusk'] ? 'top-level-extension' : '',
  };

  treeData.push({
    key: 'root',
    title: (
      <S.ContentLabel
        $level="top"
        $ref={rootNodeContent.kuskExtensionRef || ''}
        onClick={() => tableOfContentsScrollToElement(rootNodeContent, layoutActions)}
      >
        {rootNodeContent.label}
      </S.ContentLabel>
    ),
    children: Object.entries(spec.paths).map((pathEntry: [string, any]) => {
      const [path, pathValue] = pathEntry;

      const pathNodeContent: TableOfContentsItem = {
        label: <TableOfContentsLabel containsKuskExtension={pathValue['x-kusk']} level="path" path={path} />,
      };

      return {
        key: path,
        title: (
          <S.ContentLabel
            $level="path"
            $ref=""
            onClick={() => tableOfContentsScrollToElement(pathNodeContent, layoutActions)}
          >
            {pathNodeContent.label}
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
                kuskExtensionRef,
                operationId,
                operationElementId: `operations-${tag}-${operationId}`,
                tag,
              };

              return {
                key: operationId,
                title: (
                  <S.ContentLabel
                    $level="operation"
                    $ref={operationTagNodeContent.kuskExtensionRef || operationTagNodeContent.operationElementId || ''}
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

  const treeData = createTableOfContentsTreeData(spec, layoutActions);

  if (!treeData) {
    return null;
  }

  return (
    <S.TableOfContentsContainer>
      <S.TableOfContentsTitle>Table of contents</S.TableOfContentsTitle>
      <S.ContentContainer>
        <S.Tree
          defaultExpandAll
          showLine={{showLeafIcon: false}}
          showIcon={false}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
        />
      </S.ContentContainer>
    </S.TableOfContentsContainer>
  );
};

export default TableOfContents;
