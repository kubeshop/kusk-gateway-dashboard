import {Upload} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Dragger = styled(Upload.Dragger)`
  &.ant-upload.ant-upload-drag {
    background-color: ${Colors.zinc1} !important;
    border: 1px dashed ${Colors.grey6};
  }
`;

export const Container = styled.div`
  display: grid;
  place-items: center;

  padding: 16px;

  svg {
    margin-bottom: 16px;
  }
  .ant-typography {
    text-align: center;
    color: ${Colors.zinc7} !important;
  }
`;
