import {useNavigate} from 'react-router-dom';

import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';

import {APIDetailsSections} from '@models/ui';

import {ApiIcon, ApiSettingsIcon, StaticRouteIcon} from '@components/Icons';

import * as S from './styled';

interface IProps {
  activeSection: APIDetailsSections;
}
const Sidebar = (props: IProps) => {
  const navigate = useNavigate();
  const {activeSection} = props;

  return (
    <S.SidebarContainer>
      <S.DashboardMenuContainer>
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="Open API Spec">
          <S.Icon component={ApiIcon} $active={activeSection === 'openapiBrowser'} onClick={() => navigate(``)} />
        </Tooltip>

        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="Routes">
          <S.Icon component={StaticRouteIcon} $active={activeSection === 'paths'} onClick={() => navigate(`paths`)} />
        </Tooltip>

        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="right" title="API Settings">
          <S.Icon
            component={ApiSettingsIcon}
            $active={activeSection === 'settings'}
            onClick={() => navigate(`settings`)}
          />
        </Tooltip>
      </S.DashboardMenuContainer>
    </S.SidebarContainer>
  );
};

export default Sidebar;
