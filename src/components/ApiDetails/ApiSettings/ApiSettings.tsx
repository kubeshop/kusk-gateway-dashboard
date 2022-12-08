import {useNavigate, useParams} from 'react-router-dom';

import {Typography} from 'antd';

import Deployments from './Settings/Deployments';
import GeneralSettings from './Settings/General';
import Hosts from './Settings/Hosts';

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

          <S.ListItem
            $selected={selectedSettingsItem === 'deployments'}
            onClick={() => navigate('settings/deployments')}
          >
            Deployments
          </S.ListItem>
          <S.ListItem $selected={selectedSettingsItem === 'domains'} onClick={() => navigate('settings/domains')}>
            Hosts
          </S.ListItem>
        </S.List>
        <div style={{padding: '0 20px 0 20px'}}>
          {selectedSettingsItem === 'general' && <GeneralSettings />}
          {selectedSettingsItem === 'deployments' && <Deployments />}
          {selectedSettingsItem === 'domains' && <Hosts />}
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
    default:
      return 'general';
  }
};
export default ApiSettings;
