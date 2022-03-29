import {Link, useLocation} from 'react-router-dom';

import {Api} from '@components/Icons';

import * as S from './DashboardMenu.styled';

const DashboardMenu: React.FC = () => {
  const {pathname} = useLocation();

  return (
    <S.DashboardMenuContainer>
      <Link to="/">
        <S.Icon component={Api} $active={pathname === '/'} />
      </Link>
    </S.DashboardMenuContainer>
  );
};

export default DashboardMenu;
