import {CSSProperties} from 'react';

import {Dropdown as RawDropdown, Typography} from 'antd';

import {
  ArrowLeftOutlined,
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
  height: 60px;
  z-index: 5;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid ${Colors.grey10};
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
`;

export const Divider = styled.div`
  display: block;
  position: relative;
  margin: 0;
  &::before {
    content: '';
    position: absolute;
    top: -24px;
    bottom: -24px;
    left: 0;
    width: 1px;
    background-color: #27272a;
  }
`;

export const DropdownContainer = styled.span`
  height: 100%;
  padding: 20px 16px;
  cursor: pointer;
  &:hover {
  }
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
  color: ${Colors.zinc700};
  font-size: 18px;
  cursor: pointer;
`;

export const GithubFilled = styled(RawGithubFilled).attrs({
  fill: Colors.zinc700,
})`
  color: ${Colors.zinc700} !important;

  font-size: 18px;
  cursor: pointer;
`;

export const SettingsFilled = styled(RawSettingFilled)`
  color: ${Colors.whitePure};
  font-size: 18px;
  cursor: pointer;
`;

export const Dropdown = styled(RawDropdown).attrs({
  overlayClassName: 'header-dropdown-menu',
  arrow: true,
})``;

export const DropdownLabel = styled(Typography.Text)`
  font-weight: 700;
  color: ${Colors.zinc700};
  margin-right: 8px;
`;

export const DropdownOverlay: CSSProperties = {
  backgroundColor: 'white',
};

export const ArrowLeftOutlinedIcon = styled(ArrowLeftOutlined)`
  margin-right: 8px;
  color: ${Colors.zinc700};
`;
