import {useNavigate, useParams} from 'react-router-dom';

import {Typography} from 'antd';

import {DevPortalSettings} from './DevPortalSettings';
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

const ApiSettings = () => {
  const navigate = useNavigate();
  const params = useParams();
  const section = params['*'] || '';
  const selectedSettingsItem = getSection(section?.split('/')?.pop() || '');

  return (
    <S.Container>
      <Typography.Title level={2}>Settings</Typography.Title>
      <Typography.Text type="secondary">
        Update your API settings and general preferences.&nbsp;
        <Typography.Link target="_blank" href="https://docs.kusk.io/guides/working-with-extension">
          Learn more
        </Typography.Link>
      </Typography.Text>

      <S.SettingsContainer>
        <S.List>
          <S.ListItem $selected={selectedSettingsItem === 'general'} onClick={() => navigate('settings/general')}>
            General
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'caching'} onClick={() => navigate('settings/caching')}>
            Caching
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'cors'} onClick={() => navigate('settings/cors')}>
            CORS
          </S.ListItem>
          <S.ListItem
            $selected={selectedSettingsItem === 'rateLimiting'}
            onClick={() => navigate('settings/rateLimiting')}
          >
            Rate Limits
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'qos'} onClick={() => navigate('settings/qos')}>
            QOS
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'target'} onClick={() => navigate('settings/target')}>
            Targets
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'domains'} onClick={() => navigate('settings/domains')}>
            Domains
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'auth'} onClick={() => navigate('settings/auth')}>
            Authentication
          </S.ListItem>
          <S.ListItem
            $selected={selectedSettingsItem === 'deployments'}
            onClick={() => navigate('settings/deployments')}
          >
            Deployments
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'portal'} onClick={() => navigate('settings/portal')}>
            Developer Portal
          </S.ListItem>
        </S.List>
        <div style={{padding: '0 20px 0 20px'}}>
          {selectedSettingsItem === 'general' && <GeneralSettings />}
          {selectedSettingsItem === 'caching' && <Caching />}
          {selectedSettingsItem === 'cors' && <CORS />}
          {selectedSettingsItem === 'rateLimiting' && <RateLimiting />}
          {selectedSettingsItem === 'qos' && <QOS />}
          {selectedSettingsItem === 'target' && <Targets />}
          {selectedSettingsItem === 'domains' && <Hosts />}
          {selectedSettingsItem === 'auth' && <Authentication />}
          {selectedSettingsItem === 'deployments' && <Deployments />}
          {selectedSettingsItem === 'portal' && <DevPortalSettings />}
        </div>
      </S.SettingsContainer>
    </S.Container>
  );
};

const getSection = (sectionParam: string) => {
  switch (sectionParam) {
    case 'caching':
      return 'caching';
    case 'cors':
      return 'cors';
    case 'rateLimiting':
      return 'rateLimiting';
    case 'qos':
      return 'qos';
    case 'target':
      return 'target';
    case 'domains':
      return 'domains';
    case 'auth':
      return 'auth';
    case 'deployments':
      return 'deployments';
    case 'portal':
      return 'portal';
    default:
      return 'general';
  }
};
export default ApiSettings;
