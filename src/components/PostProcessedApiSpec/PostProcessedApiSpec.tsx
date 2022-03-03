import {Skeleton} from 'antd';

import SwaggerUI from 'swagger-ui-react';

import openApiSpec from '@constants/openApiSpec.json';

import {useGetPostProcessedOpenApiSpec} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {TableOfContentsPlugin} from '@swaggerUI/plugins';

import * as S from './styled';

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
