import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';

import {APIDetailsSections} from '@models/ui';

import {
  ApiAnalyticsIcon,
  ApiDashboardIcon,
  ApiDeploymentsIcon,
  ApiIcon,
  ApiSettingsIcon,
  StaticRouteIcon,
} from '@components/Icons';

import * as S from './styled';

interface IProps {
  activeSection: APIDetailsSections;
  setActiveSection: (activeSection: APIDetailsSections) => void;
}
const Sidebar = (props: IProps) => {
  const {activeSection, setActiveSection} = props;

  return (
    <S.SidebarContainer>
      <S.DashboardMenuContainer>
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="Dashboard">
          <S.Icon
            component={ApiDashboardIcon}
            $active={activeSection === 'dashboard'}
            onClick={() => setActiveSection('dashboard')}
          />
        </Tooltip>

        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="Open API Spec">
          <S.Icon
            component={ApiIcon}
            $active={activeSection === 'openapiBrowser'}
            onClick={() => setActiveSection('openapiBrowser')}
          />
        </Tooltip>

        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="Routes List">
          <S.Icon
            component={StaticRouteIcon}
            $active={activeSection === 'routes'}
            onClick={() => setActiveSection('routes')}
          />
        </Tooltip>

        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="Deployments">
          <S.Icon
            component={ApiDeploymentsIcon}
            $active={activeSection === 'deployments'}
            onClick={() => setActiveSection('deployments')}
          />
        </Tooltip>

        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="Analytics">
          <S.Icon
            component={ApiAnalyticsIcon}
            $active={activeSection === 'logs'}
            onClick={() => setActiveSection('logs')}
          />
        </Tooltip>

        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="API Settings">
          <S.Icon
            component={ApiSettingsIcon}
            $active={activeSection === 'settings'}
            onClick={() => setActiveSection('settings')}
          />
        </Tooltip>
      </S.DashboardMenuContainer>
    </S.SidebarContainer>
  );
};

export default Sidebar;
