import {Link, useLocation} from 'react-router-dom';

import {Api, EnvoyFleet, StaticRoute} from '@components/Icons';

import * as S from './DashboardMenu.styled';

const DashboardMenu: React.FC = () => {
  const {pathname} = useLocation();

  return (
    <S.DashboardMenuContainer>
      <Link to="/">
        <S.Icon $border component={Api} $active={pathname === '/'} />
      </Link>

      <Link to="/envoy-fleets">
        <S.Icon $border component={EnvoyFleet} $active={pathname === '/envoy-fleets'} />
      </Link>

      <Link to="/static-routes">
        <S.Icon component={StaticRoute} $active={pathname === '/static-routes'} />
      </Link>
    </S.DashboardMenuContainer>
  );
};

export default DashboardMenu;
