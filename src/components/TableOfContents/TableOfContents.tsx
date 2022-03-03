import {SUPPORTED_METHODS} from '@constants/constants';

import {TableOfContentsItem} from '@models/swaggerUI';

import KuskExtensionIcon from './KuskExtensionIcon';

import * as S from './styled';

interface IProps {
  layoutActions: any;
  spec: any;
}

const createTableOfContents = (spec: any) => {
  let tableOfContents: TableOfContentsItem[] = [];

  // top level extension
  tableOfContents.push({
    label: (
      <S.TableOfContentsLabel $level="top">
        - Root object {spec['x-kusk'] && <KuskExtensionIcon />}
      </S.TableOfContentsLabel>
    ),
    kuskExtensionRef: spec['x-kusk'] ? 'top-level-extension' : '',
    level: 'top',
  });

  Object.entries(spec.paths).forEach((pathEntry: [string, any]) => {
    const [path, pathValue] = pathEntry;

    // TODO: Add ref and operationElementId?? depending on how we show the path
    tableOfContents.push({
      label: (
        <S.TableOfContentsLabel $level="path">
          - {path} {pathValue['x-kusk'] && <KuskExtensionIcon />}
        </S.TableOfContentsLabel>
      ),
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

        if (operationValue.tags && operationValue.tags.length) {
          operationValue.tags.forEach((tag: string) => {
            tableOfContents.push({
              label: (
                <S.TableOfContentsLabel $level="operation">
                  - <S.LabelTag>{tag}</S.LabelTag> <S.LabelPath $deprecated={deprecated}>{path}</S.LabelPath>
                  <S.LabelMethodTag $deprecated={deprecated} $method={operation}>
                    {operation.toUpperCase()}
                  </S.LabelMethodTag>
                  {kuskExtensionRef && <KuskExtensionIcon />}
                </S.TableOfContentsLabel>
              ),
              kuskExtensionRef,
              operationId,
              operationElementId: `operations-${tag}-${operationId}`,
              level: 'operation',
              tag,
            });
          });
        } else {
          tableOfContents.push({
            label: (
              <S.TableOfContentsLabel $level="operation">
                - <S.LabelTag>default</S.LabelTag> <S.LabelPath $deprecated={deprecated}>{path}</S.LabelPath>
                <S.LabelMethodTag $deprecated={deprecated} $method={operation}>
                  {operation.toUpperCase()}
                </S.LabelMethodTag>
                {kuskExtensionRef && <KuskExtensionIcon />}
              </S.TableOfContentsLabel>
            ),
            kuskExtensionRef,
            operationId,
            operationElementId: `operations-default-${operationId}`,
            level: 'operation',
          });
        }
      });
  });

  return tableOfContents;
};

const tableOfContentsScrollToElement = (content: TableOfContentsItem, layoutActions: any) => {
  const {kuskExtensionRef, operationElementId, operationId, tag, level} = content;

  // scroll to top/path level extension
  if (level !== 'operation' && kuskExtensionRef) {
    document.getElementById(kuskExtensionRef)?.scrollIntoView({behavior: 'smooth'});
  } else if (operationElementId) {
    // if operation expanded, scroll to kusk extension or to operation summary
    if (document.getElementById(operationElementId)?.classList.contains('is-open')) {
      document.getElementById(kuskExtensionRef || operationElementId)?.scrollIntoView({behavior: 'smooth'});
    } else {
      // expand the operation and the scroll to kusk extension or to operation summary
      layoutActions.show(['operations', tag || 'default', operationId], true);

      setTimeout(() => {
        document.getElementById(kuskExtensionRef || operationElementId)?.scrollIntoView({behavior: 'smooth'});
      }, 200);
    }
  }
};

const TableOfContents: React.FC<IProps> = props => {
  const {layoutActions, spec} = props;

  const tableOfContents = createTableOfContents(spec);

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
