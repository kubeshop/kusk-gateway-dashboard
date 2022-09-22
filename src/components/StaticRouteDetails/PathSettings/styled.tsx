import {Tabs as AntTabs} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Tabs = styled(AntTabs)`
  .ant-tabs-nav::before {
    border-bottom: none;
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

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
