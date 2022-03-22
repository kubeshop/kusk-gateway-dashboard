import styled from 'styled-components';

import {SwaggerUIStyle} from '@swaggerUI/style';

export const ErrorLabel = styled.span`
  color: red;
`;

export const RawApiSpecContainer = styled.div`
  ${SwaggerUIStyle}

  & .swagger-ui {
    & .scheme-container {
      display: none;
    }
  }
`;
