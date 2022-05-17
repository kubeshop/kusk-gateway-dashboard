import {Steps} from 'antd';

import styled from 'styled-components';

export const Step = styled(Steps.Step)<{$completed: boolean}>`
  ${({$completed}) => {
    if ($completed) {
      return `
        & .ant-steps-item-container:hover {
          cursor: pointer;

          & .ant-steps-item-title {
            font-weight: bold;
          }
        }
      `;
    }
  }}

  & .ant-steps-item-container {
    width: max-content;
  }

  & .ant-steps-icon {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .ant-steps-item-title {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
