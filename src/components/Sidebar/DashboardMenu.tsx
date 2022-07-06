import {Link, useLocation} from 'react-router-dom';

import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';

import {ApiIcon, EnvoyFleetIcon, StaticRouteIcon} from '@components/Icons';

import * as S from './DashboardMenu.styled';

const DashboardMenu: React.FC = () => {
  const {pathname} = useLocation();

  return (
    <S.DashboardMenuContainer>
      <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="APIs List">
        <Link to="/">
          <S.Icon component={ApiIcon} $active={pathname === '/'} />
        </Link>
      </Tooltip>

      <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="EnvoyFleets List">
        <Link to="/envoy-fleets">
          <S.Icon component={EnvoyFleetIcon} $active={pathname === '/envoy-fleets'} />
        </Link>
      </Tooltip>

      <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="Static Routes List">
        <Link to="/static-routes">
          <S.Icon component={StaticRouteIcon} $active={pathname === '/static-routes'} />
        </Link>
      </Tooltip>
    </S.DashboardMenuContainer>
  );
};

export default DashboardMenu;
