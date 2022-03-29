import {Link, useLocation} from 'react-router-dom';

import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';

import {Api, EnvoyFleet, StaticRoute} from '@components/Icons';

import * as S from './DashboardMenu.styled';

const DashboardMenu: React.FC = () => {
  const {pathname} = useLocation();

  return (
    <S.DashboardMenuContainer>
      <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="APIs List">
        <Link to="/">
          <S.Icon $border component={Api} $active={pathname === '/'} />
        </Link>
      </Tooltip>

      <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="EnvoyFleets List">
        <Link to="/envoy-fleets">
          <S.Icon $border component={EnvoyFleet} $active={pathname === '/envoy-fleets'} />
        </Link>
      </Tooltip>

      <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title="StaticRoutes List">
        <Link to="/static-routes">
          <S.Icon component={StaticRoute} $active={pathname === '/static-routes'} />
        </Link>
      </Tooltip>
    </S.DashboardMenuContainer>
  );
};

export default DashboardMenu;
