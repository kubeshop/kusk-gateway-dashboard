import styled from 'styled-components';

import Colors from 'src/styles/colors';

export const ApiSpecContainer = styled.div`
  & .swagger-ui {
    & button {
      outline: none !important;
    }

    & input {
      caret-color: ${Colors.grey2};
      outline: none !important;
      color: ${Colors.grey2};
    }

    & svg.arrow {
      fill: ${Colors.whitePure};
    }

    & label span,
    & h4 {
      color: ${Colors.whitePure};
    }

    & .btn {
      color: ${Colors.whitePure};

      &.cancel {
        color: #ff6060;
      }
    }

    & .model {
      color: ${Colors.whitePure};

      &-title {
        color: ${Colors.grey9};
      }
    }

    & section.models {
      border: 1px solid ${Colors.grey1};

      & svg {
        fill: ${Colors.whitePure};
      }

      & h4 span {
        color: ${Colors.whitePure};
      }
    }

    & .model-toggle:after {
      background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23ffffff" width="24" height="24"><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>')
        50% no-repeat;
    }

    & .tab {
      & li:first-of-type:after {
        background: rgba(255, 255, 255, 0.3);
      }

      & .tabitem {
        & button.tablinks {
          color: ${Colors.grey0};
        }
      }

      & .active {
        & button.tablinks {
          color: ${Colors.whitePure};
          font-weight: bold;
        }
      }
    }

    & .renderedMarkdown,
    & .markdown {
      & p {
        color: ${Colors.whitePure};
        margin: 0 auto !important;
      }
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
      &-description p {
        color: ${Colors.whitePure};
      }

      & .opblock-section-header {
        background: ${Colors.grey4};

        & h4 {
          color: ${Colors.whitePure};

          & span {
            color: ${Colors.whitePure};

            &:after {
              bottom: -10px !important;
            }
          }
        }
      }

      & .opblock-summary-path {
        color: ${Colors.whitePure};

        &__deprecated {
          color: ${Colors.whitePure};
        }
      }

      & .opblock-summary-description {
        color: ${Colors.whitePure};
        padding-top: 2.5px;
      }
    }

    & .parameters-container {
      color: ${Colors.whitePure};

      & th {
        color: ${Colors.whitePure};
      }

      & .parameter {
        &__name,
        &__type {
          color: ${Colors.whitePure};
        }
      }
    }

    & .responses-wrapper {
      & td {
        color: ${Colors.whitePure};
      }
    }
  }
`;

export const ErrorLabel = styled.span`
  color: red;
`;
