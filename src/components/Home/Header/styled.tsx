import {Menu} from 'antd';

import {
  GithubFilled as RawGithubFilled,
  QuestionCircleFilled as RawQuestionsCircleFilled,
  SettingFilled as RawSettingFilled,
} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';
import {Transitions} from '@styles/global';

export const Container = styled.div`
  position: sticky;
  top: 0;
  height: 64px;
  z-index: 5;
  background-color: ${Colors.zinc9};
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Logo = styled.img`
  height: 36px;
  cursor: pointer;
  margin-right: 16px;
`;

export const RightContent = styled.div`
  display: flex;
  gap: 16px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0;
  opacity: 0.5;
  transition: ${Transitions.default};

  &:hover {
    opacity: 1;
  }
`;

export const QuestionCircleFilled = styled(RawQuestionsCircleFilled)`
  color: ${Colors.whitePure};
  font-size: 18px;
  cursor: pointer;
`;

export const GithubFilled = styled(RawGithubFilled)`
  color: ${Colors.whitePure};
  font-size: 18px;
  cursor: pointer;
`;

export const SettingsFilled = styled(RawSettingFilled)`
  color: ${Colors.whitePure};
  font-size: 18px;
  cursor: pointer;
`;

export const ResourceMenu = styled(Menu)`
  align-self: stretch;

  margin-left: auto;
  margin-right: 60px;
  color: white !important;
  background-color: transparent !important;
  border-bottom: none !important;

  .ant-menu-item-selected {
    background-color: ${Colors.slate800} !important;
    color: ${Colors.cyan5} !important;
  }

  .ant-menu-item:hover {
    color: ${Colors.cyan5} !important;
  }

  &.ant-menu-horizontal > .ant-menu-item {
    top: 0px !important;
    display: flex;
    align-items: center;
  }

  .ant-menu-item-selected::after,
  .ant-menu-item:hover::after {
    content: none !important;
    border-bottom: none !important;
  }
`;
