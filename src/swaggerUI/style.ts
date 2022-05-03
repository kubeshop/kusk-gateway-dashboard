import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

export const SwaggerUIStyle = `
& .swagger-ui {
    & button {
      outline: none !important;
    }

    & button.expand-operation {
      padding-top: 7px;
    }

    & label span,
    & h4,
    & h5 {
      color: ${Colors.whitePure};
    }

    & h3.opblock-tag {
      pointer-events: none;
      display: grid;
      grid-template-columns: max-content 1fr max-content;
      grid-column-gap: 10px;
      padding-left: 0px;

      & small {
        padding: 0;
      }

      & button {
        display: none;
      }
    }

    & input {
      caret-color: ${Colors.grey2};
      outline: none !important;
      color: ${Colors.grey2};
    }

    & section.models {
      border: 1px solid ${Colors.grey1};

      & h4 span {
        color: ${Colors.whitePure};
      }

      & svg {
        fill: ${Colors.whitePure};
      }

      & h4 {
        cursor: default;
        
        &:hover {
          background: ${Colors.grey4};
        }

        & button {
          pointer-events: none;
        }

        & svg {
          display: none;
        }
      }
    }

    & select {
      outline: none !important;
      cursor: pointer;
    }

    & svg.arrow {
      fill: ${Colors.whitePure};
    }

    & .btn {
      color: ${Colors.whitePure};

      &.cancel {
        color: #ff6060;
      }
    }

    & .description {
      margin-bottom: 20px;
    }

    & .highlight-code {
      & pre {
        margin-bottom: 20px;
        overflow-y: auto;

        ${GlobalScrollbarStyle};
      }

      & .download-contents {
        right: 15px;
      }

      & .copy-to-clipboard {
        right: 105px;
      }
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

    & .model {
      color: ${Colors.whitePure};

      &-title {
        color: ${Colors.grey9};
      }
    }

    & .model-toggle:after {
      background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23ffffff" width="24" height="24"><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>')
        50% no-repeat;
    }

    & .parameters-container {
      color: ${Colors.whitePure};

      & th, & p {
        color: ${Colors.whitePure};
      }

      & .parameter {
        &__name,
        &__type {
          color: ${Colors.whitePure};
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

    & .responses-wrapper {
      & td {
        color: ${Colors.whitePure};
      }
    }

    & .scheme-container {
      margin-top: 50px;
      color: ${Colors.whitePure};
      background: ${Colors.grey4};
      box-shadow: none;
      padding: 0;

      & label {
        color: ${Colors.whitePure};
      }
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

    & .wrapper {
      padding: 0;
      max-width: none;
    }

    & .opblock {
      &-description p {
        color: ${Colors.whitePure};
      }

      &-tag {
        color: ${Colors.whitePure};

        & small {
          color: ${Colors.grey1};
        }
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
        max-width: none;

        &__deprecated {
          color: ${Colors.whitePure};
        }
      }

      & .opblock-summary-description {
        color: ${Colors.whitePure};
        padding-top: 2.5px;
      }
    }
  }
`;
