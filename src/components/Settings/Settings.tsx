import {Suspense, lazy} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Typography} from 'antd';

import {AppRoutes} from '@constants/AppRoutes';

import {useAppSelector} from '@redux/hooks';

import {DeploymentsSettings} from './DeploymentsSettings';
import {DevPortalSettings} from './DevPortalSettings';
import {KuskSettings} from './KuskSettings';

import * as S from './styled';

type SettingType = 'kusk' | 'deployments' | 'devportal';

const AddEnvoyFleetModal = lazy(() => import('@components/AddEnvoyFleetModal/AddEnvoyFleetModal'));
const AddStaticRouteModal = lazy(() => import('@components/AddStaticRouteModal/AddStaticRouteModal'));

const Settings = () => {
  const navigate = useNavigate();
  const {'*': path} = useParams();
  const isEnvoyFleetPublishModalVisible = useAppSelector(state => state.ui.envoyFleetModal.isOpen);
  const isStaticRouteModalVisible = useAppSelector(state => state.ui.staticRouteModal.isOpen);

  const settingSection = (path?.split('/')[1] || 'kusk') as SettingType;
  const selectedSettingsItem: SettingType = settingSection || 'kusk';

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
          <S.ListItem
            $selected={selectedSettingsItem === 'kusk'}
            onClick={() => navigate(`${AppRoutes.APP_SETTINGS}/kusk`)}
          >
            Kusk settings
          </S.ListItem>
          <S.ListItem
            $selected={selectedSettingsItem === 'deployments'}
            onClick={() => navigate(`${AppRoutes.APP_SETTINGS}/deployments`)}
          >
            Deployment fleets
          </S.ListItem>
          <S.ListItem
            $selected={selectedSettingsItem === 'devportal'}
            onClick={() => navigate(`${AppRoutes.APP_SETTINGS}/devportal`)}
          >
            Developer Portal
          </S.ListItem>
        </S.List>

        <div>
          {selectedSettingsItem === 'kusk' && <KuskSettings />}
          {selectedSettingsItem === 'deployments' && <DeploymentsSettings />}
          {selectedSettingsItem === 'devportal' && <DevPortalSettings />}
        </div>
      </S.SettingsContainer>
      <Suspense fallback={null}>{isEnvoyFleetPublishModalVisible && <AddEnvoyFleetModal />}</Suspense>
      <Suspense fallback={null}>{isStaticRouteModalVisible && <AddStaticRouteModal />}</Suspense>
    </S.Container>
  );
};

export default Settings;
