import React from 'react';

import {Skeleton} from 'antd';
import {DataNode} from 'antd/lib/tree';

import {DownOutlined} from '@ant-design/icons';

import SwaggerUI from 'swagger-ui-react';

import openApiSpec from '@constants/rawOpenApiSpec.json';

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
      const spec = system.specSelectors.specJson().toJS();

      const treeData = Object.entries(spec['x-kusk']).map(([key, children]) => createExtensionTreeNode(key, children));

      return (
        <>
          <Original {...props} />

          {spec['x-kusk'] && (
            <div>
              <S.ExtensionTitle>X-kusk extension (Top level)</S.ExtensionTitle>
              <S.Tree
                defaultExpandAll
                showLine={{showLeafIcon: false}}
                showIcon={false}
                switcherIcon={<DownOutlined />}
                treeData={treeData}
              />{' '}
            </div>
          )}
        </>
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
