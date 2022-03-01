import {Skeleton} from 'antd';

import SwaggerUI from 'swagger-ui-react';

import openApiSpec from '@constants/kuskOpenApiSpec.json';

import {useGetPostProcessedOpenApiSpec} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import TableOfContents from '../TableOfContents/TableOfContents';

import * as S from './styled';

const TableOfContentsPlugin = (system: any) => ({
  wrapComponents: {
    info: (Original: any) => (props: any) => {
      const {layoutActions, specSelectors} = system;

      const spec = specSelectors.specJson().toJS();

      return (
        <>
          <Original {...props} />

          <TableOfContents layoutActions={layoutActions} spec={spec} />
        </>
      );
    },
  },
});

const PostProcessedApiSpec: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetPostProcessedOpenApiSpec({apiId: selectedApi});

  return (
    <S.PostProcessedApiSpecContainer>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <S.ErrorLabel>{error.message}</S.ErrorLabel>
      ) : (
        data && <SwaggerUI spec={openApiSpec} plugins={[TableOfContentsPlugin]} />
      )}
    </S.PostProcessedApiSpecContainer>
  );
};

export default PostProcessedApiSpec;
