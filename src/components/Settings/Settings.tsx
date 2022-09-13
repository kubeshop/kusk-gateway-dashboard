import {useLocation, useNavigate} from 'react-router-dom';

import {Typography} from 'antd';

import {DeploymentsSettings} from './DeploymentsSettings';
import {KuskSettings} from './KuskSettings';
import {StaticRoutesSettings} from './StaticRoutesSettings';

import * as S from './styled';

type SettingType = 'kusk' | 'deployments' | 'staticRoutes';

const Settings = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const setting = pathname.split('/').pop();
  const selectedSettingsItem: SettingType =
    setting === 'staticRoutes' ? 'staticRoutes' : setting === 'deployments' ? 'deployments' : 'kusk';

  return (
    <S.Container>
      <S.Title level={1}>Settings</S.Title>
      <S.SubHeading type="secondary">
        Update your kusk settings and general preferences.&nbsp;
        <Typography.Link target="_blank" href="https://docs.kusk.io/dashboard/overview/">
          Learn more
        </Typography.Link>
      </S.SubHeading>

      <S.SettingsContainer>
        <S.List>
          <S.ListItem $selected={selectedSettingsItem === 'kusk'} onClick={() => navigate('/settings/kusk')}>
            kusk settings
          </S.ListItem>
          <S.ListItem
            $selected={selectedSettingsItem === 'deployments'}
            onClick={() => navigate('/settings/deployments')}
          >
            Deployment fleets
          </S.ListItem>

          <S.ListItem
            $selected={selectedSettingsItem === 'staticRoutes'}
            onClick={() => navigate('/settings/staticRoutes')}
          >
            Static routes
          </S.ListItem>
        </S.List>
        <div>
          {selectedSettingsItem === 'kusk' && <KuskSettings />}
          {selectedSettingsItem === 'deployments' && <DeploymentsSettings />}
          {selectedSettingsItem === 'staticRoutes' && <StaticRoutesSettings />}
        </div>
      </S.SettingsContainer>
    </S.Container>
  );
};

export default Settings;
