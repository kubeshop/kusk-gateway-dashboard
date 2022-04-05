import {Input, Steps} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-column-gap: 10px;
`;

export const Step = styled(Steps.Step)`
  & .ant-steps-icon {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .ant-steps-item-title {
    width: 155px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const StepsContainer = styled.div`
  padding-right: 5px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  ${GlobalScrollbarStyle};
`;

export const Textarea = styled(Input.TextArea)`
  background-color: ${Colors.grey2};
`;
