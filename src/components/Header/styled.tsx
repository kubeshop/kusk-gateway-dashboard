import {CSSProperties} from 'react';

import {Button, Dropdown as RawDropdown, Typography} from 'antd';

import {
  GithubFilled as RawGithubFilled,
  QuestionCircleFilled as RawQuestionsCircleFilled,
  SettingFilled as RawSettingFilled,
} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  grid-area: nav;
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 70px;
  height: 36px;
  cursor: pointer;
`;

export const OptionsContainer = styled.div`
  display: flex;
  margin-left: auto;
  gap: 16px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0;
  opacity: 0.5;
  transition: all 0.2s ease-in;

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

export const TeamContainer = styled.div`
  width: 78px;
  margin-left: 24px;
`;

export const Dropdown = styled(RawDropdown).attrs({
  overlayClassName: 'header-dropdown-menu',
  arrow: true,
})``;

export const DropdownLabel = styled(Typography.Text)`
  font-weight: 700;
  color: ${Colors.cyanBlue};
  margin-right: 8px;
`;

export const TeamLabel = styled(Typography.Text)`
  font-weight: 700;
  background-color: ${Colors.cyanBlue};
  color: black;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
`;

export const APIVersionLabel = styled(Typography.Text)`
  font-weight: 400;
  color: ${Colors.spunPearl};
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 4px;
`;

export const EnvButton = styled(Button)`
  background-color: #27272a;
  border: 1px solid #3f3f46;
`;

export const EnvStatus = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a3e635;
  margin-right: 4px;
`;

export const DropdownOverlay: CSSProperties = {
  backgroundColor: 'white',
};
