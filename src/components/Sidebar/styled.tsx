import {
  GithubFilled as RawGithubFilled,
  QuestionCircleFilled as RawQuestionsCircleFilled,
  SettingFilled as RawSettingFilled,
} from '@ant-design/icons';

import styled from 'styled-components';

import {SIDEBAR_WIDTH} from '@constants/constants';

import Colors from '@styles/colors';

export const Logo = styled.img`
  height: 36px;
  cursor: pointer;
`;

export const GithubFilled = styled(RawGithubFilled)`
  color: ${Colors.whitePure};
  font-size: 18px;
  cursor: pointer;
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

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;
  padding-bottom: 16px;
`;

export const QuestionCircleFilled = styled(RawQuestionsCircleFilled)`
  color: ${Colors.whitePure};
  font-size: 18px;
  cursor: pointer;
`;

export const SettingsFilled = styled(RawSettingFilled)`
  color: ${Colors.whitePure};
  font-size: 18px;
  cursor: pointer;
`;

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: ${SIDEBAR_WIDTH}px;
  background: ${Colors.blackPure};
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;
