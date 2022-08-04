import {useState} from 'react';

import {Typography} from 'antd';

import Authentication from './Settings/Authentication';
import CORS from './Settings/CORS';
import Caching from './Settings/Caching';
import Deployments from './Settings/Deployments';
import GeneralSettings from './Settings/General';
import Hosts from './Settings/Hosts';
import QOS from './Settings/QOS';
import RateLimiting from './Settings/RateLimiting';
import Targets from './Settings/Targets';

import * as S from './styled';

type Settings = 'general' | 'caching' | 'cors' | 'rateLimiting' | 'qos' | 'target' | 'domains' | 'auth' | 'deployments';

const ApiSettings = () => {
  const [selectedSettingsItem, setSelectedSettingsItem] = useState<Settings>('general');
  return (
    <>
      <Typography.Title level={2}>Settings</Typography.Title>
      <Typography.Text type="secondary">
        Update your API settings and general preferences.&nbsp;
        <Typography.Link target="_blank" href="https://kubeshop.github.io/kusk-gateway/reference/extension/">
          Learn more
        </Typography.Link>
      </Typography.Text>

      <S.SettingsContainer>
        <S.List>
          <S.ListItem $selected={selectedSettingsItem === 'general'} onClick={() => setSelectedSettingsItem('general')}>
            General
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'caching'} onClick={() => setSelectedSettingsItem('caching')}>
            Caching
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'cors'} onClick={() => setSelectedSettingsItem('cors')}>
            CORS
          </S.ListItem>
          <S.ListItem
            $selected={selectedSettingsItem === 'rateLimiting'}
            onClick={() => setSelectedSettingsItem('rateLimiting')}
          >
            Rate Limits
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'qos'} onClick={() => setSelectedSettingsItem('qos')}>
            QOS
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'target'} onClick={() => setSelectedSettingsItem('target')}>
            Targets
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'domains'} onClick={() => setSelectedSettingsItem('domains')}>
            Domains
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'auth'} onClick={() => setSelectedSettingsItem('auth')}>
            Authentication
          </S.ListItem>
          <S.ListItem
            $selected={selectedSettingsItem === 'deployments'}
            onClick={() => setSelectedSettingsItem('deployments')}
          >
            Deployments
          </S.ListItem>
        </S.List>
        <div>
          {selectedSettingsItem === 'general' && <GeneralSettings />}
          {selectedSettingsItem === 'caching' && <Caching />}
          {selectedSettingsItem === 'cors' && <CORS />}
          {selectedSettingsItem === 'rateLimiting' && <RateLimiting />}
          {selectedSettingsItem === 'qos' && <QOS />}
          {selectedSettingsItem === 'target' && <Targets />}
          {selectedSettingsItem === 'domains' && <Hosts />}
          {selectedSettingsItem === 'auth' && <Authentication />}
          {selectedSettingsItem === 'deployments' && <Deployments />}
        </div>
      </S.SettingsContainer>
    </>
  );
};
export default ApiSettings;
