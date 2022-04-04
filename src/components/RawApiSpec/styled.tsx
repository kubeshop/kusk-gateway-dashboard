import styled from 'styled-components';

import {SwaggerUIStyle} from '@swaggerUI/style';

export const RawApiSpecContainer = styled.div`
  ${SwaggerUIStyle}

  & .swagger-ui {
    & .scheme-container {
      display: none;
    }
  }
`;
