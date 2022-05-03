import styled from 'styled-components';

import {SwaggerUIStyle} from '@swaggerUI/style';

export const ApiDefinitionContainer = styled.div`
  ${SwaggerUIStyle}

  & .swagger-ui {
    & .scheme-container {
      display: none;
    }
  }
`;
