import {Link} from 'react-router-dom';

import KuskLogo from '@assets/KuskLogo.svg';

import DashboardMenu from './DashboardMenu';

import * as S from './styled';

const Sidebar = () => {
  return (
    <S.SidebarContainer>
      <Link to="/">
        <S.Logo id="sidebar-kusk-logo" src={KuskLogo} alt="Kusk" />
      </Link>

      <DashboardMenu />

      <S.OptionsContainer>
        <S.IconContainer>
          <Link to="/settings">
            <S.SettingsFilled />
          </Link>
        </S.IconContainer>
        
        <S.IconContainer>
          <a href="https://github.com/kubeshop/kusk-gateway" target="_blank" rel="noopener noreferrer">
            <S.GithubFilled />
          </a>
        </S.IconContainer>

        <S.IconContainer>
          <a href="https://kubeshop.github.io/kusk-gateway/" target="_blank" rel="noopener noreferrer">
            <S.QuestionCircleFilled />
          </a>
        </S.IconContainer>
      </S.OptionsContainer>
    </S.SidebarContainer>
  );
};

export default Sidebar;
