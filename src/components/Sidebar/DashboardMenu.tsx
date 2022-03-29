import {Link, useLocation} from 'react-router-dom';

import {Api, EnvoyFleet} from '@components/Icons';

import * as S from './DashboardMenu.styled';

const DashboardMenu: React.FC = () => {
  const {pathname} = useLocation();

  return (
    <S.DashboardMenuContainer>
      <Link to="/">
        <S.Icon component={Api} $active={pathname === '/'} />
      </Link>

      <Link to="envoy-fleets">
        <S.Icon component={EnvoyFleet} $active={pathname === '/envoy-fleets'} />
      </Link>
    </S.DashboardMenuContainer>
  );
};

export default DashboardMenu;
