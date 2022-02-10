import * as S from './styled';

import KuskLogo from '../../assets/KuskLogo.svg';

const Sidebar = () => {
  return (
    <S.SidebarContainer>
      <S.Logo id="sidebar-kusk-logo" src={KuskLogo} alt="Kusk" />
    </S.SidebarContainer>
  );
};

export default Sidebar;
