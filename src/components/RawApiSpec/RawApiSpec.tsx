import React from 'react';

import {Skeleton} from 'antd';
import {DataNode} from 'antd/lib/tree';

import {DownOutlined} from '@ant-design/icons';

import SwaggerUI from 'swagger-ui-react';

import openApiSpec from '@constants/kuskOpenApiSpec.json';

import {useGetRawOpenApiSpec} from '@models/api';

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

const ExtensionsPlugin = (system: any) => ({
  wrapComponents: {
    info: (Original: any) => (props: any) => {
      const {specSelectors} = system;

      const spec = specSelectors.specJson().toJS();
      let treeData: DataNode[] = [];

      if (spec['x-kusk']) {
        treeData = Object.entries(spec['x-kusk']).map(([key, children]) => createExtensionTreeNode(key, children));
      }

      return (
        <>
          <Original {...props} />

          {spec['x-kusk'] && (
            <div>
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

    OperationExt: () => (props: any) => {
      const {extensions} = props;

      const xKuskExtensionSpec = extensions.toJS()['x-kusk'];

      if (!xKuskExtensionSpec) {
        return null;
      }

      const treeData = Object.entries(xKuskExtensionSpec).map(([key, children]) =>
        createExtensionTreeNode(key, children)
      );

      return (
        <div className="opblock-section">
          <div className="opblock-section-header">
            <h4>X-kusk extension</h4>
          </div>

          <div className="table-container">
            <S.Tree
              $level="operation"
              defaultExpandAll
              showLine={{showLeafIcon: false}}
              showIcon={false}
              switcherIcon={<DownOutlined />}
              treeData={treeData}
            />
          </div>
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
        data && <SwaggerUI spec={openApiSpec} plugins={[ExtensionsPlugin]} supportedSubmitMethods={[]} showExtensions />
      )}
    </S.RawApiSpecContainer>
  );
};

export default RawApiSpec;
