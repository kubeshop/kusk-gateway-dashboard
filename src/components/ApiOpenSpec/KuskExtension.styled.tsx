import {Typography} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  padding: 0 20px;
  height: calc(100% - 84px);
`;

export const Title = styled(Typography.Title)`
  margin: 20px 0 !important;
`;

export const EditorContainer = styled.div`
  display: flex;
  min-height: calc(100% - 118px);
  width: 49%;
  padding-right: 8px;
`;

export const RightPane = styled.div`
  position: absolute;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 20px;
  border-left: 1px solid ${Colors.grey10};
  background-color: ${Colors.zinc5};
  height: 100%;
  overflow-y: auto;
`;
