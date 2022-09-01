import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';

import {APIDetailsSections} from '@models/ui';

import {ApiIcon, ApiSettingsIcon, StaticRouteIcon} from '@components/Icons';

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
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="Open API Spec">
          <S.Icon
            component={ApiIcon}
            $active={activeSection === 'openapiBrowser'}
            onClick={() => setActiveSection('openapiBrowser')}
          />
        </Tooltip>

        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="Paths List">
          <S.Icon
            component={StaticRouteIcon}
            $active={activeSection === 'routes'}
            onClick={() => setActiveSection('routes')}
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
