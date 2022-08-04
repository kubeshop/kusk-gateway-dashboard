import AntdIcon, {
  GithubFilled as RawGithubFilled,
  QuestionCircleFilled as RawQuestionsCircleFilled,
  SettingFilled as RawSettingFilled,
} from '@ant-design/icons';

import styled from 'styled-components';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  height: 100%;
  background-color: ${Colors.zinc5};
  box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.25);
`;

export const DashboardMenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 72px;
`;

export const Icon = styled(AntdIcon)<{$active: boolean; $border?: boolean}>`
  ${({$active, $border}) => `
    color: ${$active ? Colors.cyan5 : Colors.grey1}};
    border-bottom: ${$border ? `1px solid ${Colors.grey4}` : 'unset'};
`};

  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0px 16px 0px;

  &:hover {
    cursor: pointer;
    color: ${Colors.cyan5};
  }

  & svg {
    width: 32px;
    height: 32px;
  }
`;
