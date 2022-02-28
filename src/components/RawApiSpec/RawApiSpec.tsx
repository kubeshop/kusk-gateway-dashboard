import React from 'react';

import {Skeleton} from 'antd';
import {DataNode} from 'antd/lib/tree';

import {DownOutlined} from '@ant-design/icons';

import SwaggerUI from 'swagger-ui-react';

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
  if (spec['x-kusk']) {
    tableOfContents.push({
      name: 'Top level',
      ref: 'top-level-extension',
      operationId: 'top-level-extension',
    });
  }

  Object.entries(spec.paths).forEach((pathEntry: [string, any]) => {
    const [path, pathValue] = pathEntry;

    // operation level extensions
    Object.entries(pathValue).forEach((operationEntry: [string, any]) => {
      const [operation, operationValue] = operationEntry;

      const reconstructedPath = path.substring(1).replaceAll('{', '').replaceAll('}', '');

      let reconstructedPathId = reconstructedPath.replaceAll('/', '__');
      const reconstructedPathRef = reconstructedPath.replaceAll('/', '-');

      if (operationValue.parameters) {
        reconstructedPathId += '_';
      }

      if (operationValue['x-kusk']) {
        if (operationValue.tags && operationValue.tags.length) {
          operationValue.tags.forEach((tag: string) => {
            tableOfContents.push({
              name: `${path} ${operation.toUpperCase()}`,
              ref: `${reconstructedPathRef}-${operation}-extension`,
              operationId: `operations-${tag}-${operation}_${reconstructedPathId}`,
            });
          });
        } else {
          // here should be if contains no tags ( default )
        }
      }
    });
  });

  return tableOfContents;
};

const tableOfContentsScrollToElement = (content: {name: string; ref: string; operationId: string}) => {
  const {operationId, ref} = content;

  const operationElement = document.getElementById(operationId);
  const extensionElement = document.getElementById(ref);

  if (operationElement?.classList.contains('is-open')) {
    extensionElement?.scrollIntoView({behavior: 'smooth'});
  } else {
    operationElement?.scrollIntoView({behavior: 'smooth'});
  }

  // document.getElementById(content.ref)?.scrollIntoView({behavior: 'smooth'});
};

const ExtensionsPlugin = (system: any) => ({
  wrapComponents: {
    info: (Original: any) => (props: any) => {
      const {specSelectors} = system;

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
              <S.TableOfContentsTitle>Table of contents (x-kusk extensions)</S.TableOfContentsTitle>
              <S.ContentContainer>
                {tableOfContents.map(content => (
                  <S.ContentLabel key={content.ref} onClick={() => tableOfContentsScrollToElement(content)}>
                    - {content.name}
                  </S.ContentLabel>
                ))}
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
