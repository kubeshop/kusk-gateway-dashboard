import {Tabs as AntTabs} from 'antd';

import {CopyOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  padding: 24px 32px;
  height: calc(100% - 60px);
`;

export const Tabs = styled(AntTabs)`
  position: sticky;
  top: 0;
  height: 100%;
  .ant-tabs-content {
    height: 100%;
  }
  .ant-tabs-tabpane {
    height: 100%;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${Colors.slate800};
  }
  .ant-tabs-ink-bar {
    background-color: ${Colors.slate800};
  }

  .ant-tabs-tab-btn {
    color: ${Colors.zinc6};
  }
`;

export const CopyPortalUrlButton = styled(CopyOutlined)`
  color: ${Colors.neutral4};
  margin-left: 12px;
`;
