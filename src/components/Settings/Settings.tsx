import {useState} from 'react';

import {Typography} from 'antd';

import {DeploymentsSettings} from './DeploymentsSettings';
import {KuskSettings} from './KuskSettings';

import * as S from './styled';

type SettingType = 'kusk' | 'deployments' | 'staticRoutes';

const Settings = () => {
  const [selectedSettingsItem, setSelectedSettingsItem] = useState<SettingType>('kusk');

  return (
    <S.Container>
      <Typography.Title level={2}>Settings</Typography.Title>
      <Typography.Text type="secondary">
        Update your kusk settings and general preferences.&nbsp;
        <Typography.Link target="_blank" href="https://docs.kusk.io/dashboard/overview/">
          Learn more
        </Typography.Link>
      </Typography.Text>
      <S.SettingsContainer>
        <S.List>
          <S.ListItem $selected={selectedSettingsItem === 'kusk'} onClick={() => setSelectedSettingsItem('kusk')}>
            kusk settings
          </S.ListItem>
          <S.ListItem
            $selected={selectedSettingsItem === 'deployments'}
            onClick={() => setSelectedSettingsItem('deployments')}
          >
            Deployment fleets
          </S.ListItem>
        </S.List>
        <div>
          {selectedSettingsItem === 'kusk' && <KuskSettings />}
          {selectedSettingsItem === 'deployments' && <DeploymentsSettings />}
        </div>
      </S.SettingsContainer>
    </S.Container>
  );
};

export default Settings;
