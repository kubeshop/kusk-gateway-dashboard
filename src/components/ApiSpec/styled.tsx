import styled from 'styled-components';

import Colors from 'src/styles/colors';

export const ApiSpecContainer = styled.div`
  & .swagger-ui {
    & button {
      outline: none !important;
    }

    & select {
      outline: none !important;
      cursor: pointer;
    }

    & .info {
      margin: 0px 0px 50px 0px;

      & .base-url {
        color: ${Colors.whitePure};
      }

      & .title {
        color: ${Colors.whitePure};
      }

      & .markdown {
        & p {
          color: ${Colors.whitePure};
        }
      }

      & .renderedMarkdown {
        & p {
          color: ${Colors.whitePure};
        }
      }
    }

    & .scheme-container {
      color: ${Colors.whitePure};
      background: ${Colors.grey4};
      box-shadow: none;
      padding: 0;

      & label {
        color: ${Colors.whitePure};
      }
    }

    & .opblock-tag {
      color: ${Colors.whitePure};

      & small {
        color: ${Colors.grey1};
      }
    }

    & .opblock {
      & .opblock-summary-path {
        color: ${Colors.whitePure};

        &__deprecated {
          color: ${Colors.whitePure};
        }
      }

      & .opblock-summary-description {
        color: ${Colors.whitePure};
      }
    }
  }
`;

export const ErrorLabel = styled.span`
  color: red;
`;
