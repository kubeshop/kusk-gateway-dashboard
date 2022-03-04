import {SUPPORTED_METHODS} from '@constants/constants';

import {TableOfContentsItem} from '@models/swaggerUI';

import TableOfContentsLabel from './TableOfContentsLabel';

import * as S from './styled';

interface IProps {
  layoutActions: any;
  spec: any;
}

const createTableOfContents = (spec: any, layoutActions: any) => {
  let tableOfContents: TableOfContentsItem[] = [];

  // top level extension
  tableOfContents.push({
    label: <TableOfContentsLabel containsKuskExtension={spec['x-kusk']} level="top" path="Root object" />,
    kuskExtensionRef: spec['x-kusk'] ? 'top-level-extension' : '',
    level: 'top',
  });

  Object.entries(spec.paths).forEach((pathEntry: [string, any]) => {
    const [path, pathValue] = pathEntry;

    // TODO: Add ref and operationElementId?? depending on how we show the path
    tableOfContents.push({
      label: <TableOfContentsLabel containsKuskExtension={pathValue['x-kusk']} level="path" path={path} />,
      level: 'path',
    });

    // operation level extensions
    Object.entries(pathValue)
      .filter(entry => SUPPORTED_METHODS.includes(entry[0]))
      .forEach((operationEntry: [string, any]) => {
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

        tags.forEach((tag: string) => {
          tableOfContents.push({
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
            level: 'operation',
            tag,
          });
        });
      });
  });

  return tableOfContents;
};

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

const TableOfContents: React.FC<IProps> = props => {
  const {layoutActions, spec} = props;

  const tableOfContents = createTableOfContents(spec, layoutActions);

  if (!tableOfContents || !tableOfContents.length) {
    return null;
  }

  return (
    <S.TableOfContentsContainer>
      <S.TableOfContentsTitle>Table of contents</S.TableOfContentsTitle>
      <S.ContentContainer>
        {tableOfContents.map((content, index) => {
          const key = `${index}-${content.level}`;

          return (
            <S.ContentLabel
              $level={content.level}
              $ref={content.kuskExtensionRef || content.operationElementId || ''}
              key={key}
              onClick={() => tableOfContentsScrollToElement(content, layoutActions)}
            >
              {content.label}
            </S.ContentLabel>
          );
        })}
      </S.ContentContainer>
    </S.TableOfContentsContainer>
  );
};

export default TableOfContents;
