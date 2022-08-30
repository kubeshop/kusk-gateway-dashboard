import {Typography} from 'antd';

import {CopyOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  height: calc(100% - 84px);
  padding: 0 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  width: 49%;
  padding-right: 4px;
`;

export const Title = styled(Typography.Title)`
  margin-bottom: 0 !important;
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
  overflow-y: scroll;
`;

export const CopyYamlButton = styled(CopyOutlined)`
  font-size: 24px;
`;
