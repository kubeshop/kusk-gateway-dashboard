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
      color: ${Colors.zinc9};
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
        color: ${Colors.zinc9};
      }

      & svg {
        fill: ${Colors.zinc9};
      }

      & h4 {
        cursor: default;
        
        &:hover {
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
      fill: ${Colors.zinc9};
    }

    & .btn {
      color: ${Colors.zinc9};

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
        color: ${Colors.zinc9};
      }

      & .title {
        color: ${Colors.zinc9};
      }

      & .markdown {
        & p {
          color: ${Colors.zinc9};
        }
      }
    }

    & .model {
      color: ${Colors.zinc9};

      &-title {
        color: ${Colors.zinc9};
      }
    }

    & .model-toggle:after {
      background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23ffffff" width="24" height="24"><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>')
        50% no-repeat;
    }

    & .parameters-container {
      color: ${Colors.zinc9};

      & th, & p {
        color: ${Colors.zinc9};
      }

      & .parameter {
        &__name,
        &__type {
          color: ${Colors.zinc9};
        }
      }
    }

    & .renderedMarkdown,
    & .markdown {
      & p {
        color: ${Colors.zinc9};
        margin: 0 auto !important;
      }
    }

    & .responses-wrapper {
      & td {
        color: ${Colors.zinc9};
      }
    }

    & .scheme-container {
      margin-top: 50px;
      color: ${Colors.zinc9};
      box-shadow: none;
      padding: 0;

      & label {
        color: ${Colors.zinc9};
      }
    }

    & .tab {
      & li:first-of-type:after {
      }

      & .tabitem {
        & button.tablinks {
          color: ${Colors.grey0};
        }
      }

      & .active {
        & button.tablinks {
          color: ${Colors.zinc9};
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
        color: ${Colors.zinc9};
      }

      &-tag {
        color: ${Colors.zinc9};

        & small {
          color: ${Colors.grey1};
        }
      }

      & .opblock-section-header {

        & h4 {
          color: ${Colors.zinc9};

          & span {
            color: ${Colors.zinc9};

            &:after {
              bottom: -10px !important;
            }
          }
        }
      }

      & .opblock-summary-path {
        color: ${Colors.zinc9};
        max-width: none;

        &__deprecated {
          color: ${Colors.zinc9};
        }
      }

      & .opblock-summary-description {
        color: ${Colors.zinc9};
        padding-top: 2.5px;
      }
    }
  }
`;
