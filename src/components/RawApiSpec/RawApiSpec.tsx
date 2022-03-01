import React from 'react';

import {Skeleton} from 'antd';
import {DataNode} from 'antd/lib/tree';

import {DownOutlined} from '@ant-design/icons';

import SwaggerUI from 'swagger-ui-react';

import {SUPPORTED_METHODS} from '@constants/constants';
import openApiSpec from '@constants/rawOpenApiSpec.json';

import {useGetRawOpenApiSpec} from '@models/api';
import {TableOfContentsItem} from '@models/swaggerUI';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

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
          : <span className="extension-property-value">{propertyValue.toString()}</span>
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

const createTableOfContents = (spec: any) => {
  let tableOfContents: TableOfContentsItem[] = [];

  // top level extension
  tableOfContents.push({
    label: <S.TableOfContentsLabel>- Root object {spec['x-kusk'] && <S.ApiOutlined />}</S.TableOfContentsLabel>,
    kuskExtensionRef: 'top-level-extension',
    level: 'top',
  });

  Object.entries(spec.paths).forEach((pathEntry: [string, any]) => {
    const [path, pathValue] = pathEntry;

    // TODO: Add ref and operationElementId?? depending on how we show the path
    tableOfContents.push({
      label: (
        <S.TableOfContentsLabel>
          - {path} {pathValue['x-kusk'] && <S.ApiOutlined />}
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

        let reconstructedPathId = reconstructedPath.replaceAll('/', '__');
        const reconstructedPathRef = reconstructedPath.replaceAll('/', '-');

        if (operationValue.parameters) {
          reconstructedPathId += '_';
        }

        let kuskExtensionRef: string = '';

        if (operationValue['x-kusk']) {
          kuskExtensionRef = `${reconstructedPathRef}-${operation}-extension`;
        }

        if (operationValue.tags && operationValue.tags.length) {
          operationValue.tags.forEach((tag: string) => {
            tableOfContents.push({
              label: (
                <S.TableOfContentsLabel>
                  - {path} {operation.toUpperCase()} <S.LabelTag>{tag}</S.LabelTag>{' '}
                  {kuskExtensionRef && <S.ApiOutlined />}
                </S.TableOfContentsLabel>
              ),
              kuskExtensionRef,
              operationId: `${operation}_${reconstructedPathId}`,
              operationElementId: `operations-${tag}-${operation}_${reconstructedPathId}`,
              level: 'operation',
              tag,
            });
          });
        } else {
          tableOfContents.push({
            label: (
              <S.TableOfContentsLabel>
                - {path} {operation.toUpperCase()} <S.LabelTag>default</S.LabelTag>{' '}
                {kuskExtensionRef && <S.ApiOutlined />}
              </S.TableOfContentsLabel>
            ),
            kuskExtensionRef,
            operationId: `${operation}_${reconstructedPathId}`,
            operationElementId: `operations-default-${operation}_${reconstructedPathId}`,
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

const ExtensionsPlugin = (system: any) => ({
  wrapComponents: {
    info: (Original: any) => (props: any) => {
      const {layoutActions, specSelectors} = system;

      const spec = specSelectors.specJson().toJS();
      let treeData: DataNode[] = [];

      if (spec['x-kusk']) {
        treeData = Object.entries(spec['x-kusk']).map(([key, children]) => createExtensionTreeNode(key, children));
      }

      const tableOfContents = createTableOfContents(spec);

      return (
        <>
          <Original {...props} />

          {tableOfContents.length ? (
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
          ) : null}

          {spec['x-kusk'] && (
            <div id="top-level-extension">
              <S.ExtensionTitle>X-kusk extension (Top level)</S.ExtensionTitle>
              <S.Tree
                $level="top"
                defaultExpandAll
                showLine={{showLeafIcon: false}}
                showIcon={false}
                switcherIcon={<DownOutlined />}
                treeData={treeData}
              />
            </div>
          )}
        </>
      );
    },

    responses: (Original: any) => (props: any) => {
      const {method, path, specSelectors} = props;

      const spec = specSelectors.specJson().toJS();

      const pathExtension = spec.paths[path]['x-kusk'];
      let methodExtension = spec.paths[path][method]['x-kusk'];
      let pathTreeData: DataNode[] = [];
      let operationTreeData: DataNode[] = [];

      const reconstructedPath = path.substring(1).replaceAll('{', '').replaceAll('}', '').replaceAll('/', '-');

      if (pathExtension) {
        pathTreeData = Object.entries(pathExtension).map(([key, children]) => createExtensionTreeNode(key, children));
      }

      if (methodExtension) {
        operationTreeData = Object.entries(methodExtension).map(([key, children]) =>
          createExtensionTreeNode(key, children)
        );
      }

      return (
        <div>
          <Original {...props} />

          {pathExtension && (
            <div className="opblock-section">
              <div className="opblock-section-header">
                <h4>X-kusk extension (Path level)</h4>
              </div>

              <div className="table-container">
                <S.Tree
                  $level="operation"
                  defaultExpandAll
                  showLine={{showLeafIcon: false}}
                  showIcon={false}
                  switcherIcon={<DownOutlined />}
                  treeData={pathTreeData}
                />
              </div>
            </div>
          )}

          {methodExtension && (
            <div className="opblock-section" id={`${reconstructedPath}-${method}-extension`}>
              <div className="opblock-section-header">
                <h4>X-kusk extension (Operation level)</h4>
              </div>

              <div className="table-container">
                <S.Tree
                  $level="operation"
                  defaultExpandAll
                  showLine={{showLeafIcon: false}}
                  showIcon={false}
                  switcherIcon={<DownOutlined />}
                  treeData={operationTreeData}
                />
              </div>
            </div>
          )}
        </div>
      );
    },
  },
});

const RawApiSpec: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetRawOpenApiSpec({apiId: selectedApi});

  return (
    <S.RawApiSpecContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <S.ErrorLabel>{error.message}</S.ErrorLabel>
      ) : (
        data && <SwaggerUI spec={openApiSpec} plugins={[ExtensionsPlugin]} supportedSubmitMethods={[]} />
      )}
    </S.RawApiSpecContainer>
  );
};

export default RawApiSpec;
