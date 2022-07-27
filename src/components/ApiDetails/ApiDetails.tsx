import {useState} from 'react';

import {APIDetailsSections} from '@models/ui';

import {ApiDashboard} from '@components/ApiDashboard';
import {ApiDeployments} from '@components/ApiDeployments';
import {ApiLogs} from '@components/ApiLogs';
import {ApiOpenSpec} from '@components/ApiOpenSpec';
import {ApiRoutes} from '@components/ApiRoutes';
import {ApiSettings} from '@components/ApiSettings';

import {Sidebar} from './Sidebar';

import * as S from './styled';

const ApiDetails = () => {
  const [activeSection, setActiveSection] = useState<APIDetailsSections>('dashboard');
  return (
    <S.Container>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <S.Content>
        {activeSection === 'dashboard' && <ApiDashboard />}
        {activeSection === 'openapiBrowser' && <ApiOpenSpec />}
        {activeSection === 'routes' && <ApiRoutes />}
        {activeSection === 'deployments' && <ApiDeployments />}
        {activeSection === 'logs' && <ApiLogs />}
        {activeSection === 'settings' && <ApiSettings />}
      </S.Content>
    </S.Container>
  );
};

export default ApiDetails;
