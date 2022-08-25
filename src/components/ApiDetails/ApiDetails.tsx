import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {skipToken} from '@reduxjs/toolkit/query/react';

import {APIDetailsSections} from '@models/ui';

import {useAppSelector} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';
import {useGetApiQuery} from '@redux/services/enhancedApi';

import {ApiDashboard} from '@components/ApiDashboard';
import {ApiDeployments} from '@components/ApiDeployments';
import {ApiLogs} from '@components/ApiLogs';
import {ApiOpenSpec} from '@components/ApiOpenSpec';
import {ApiRoutes} from '@components/ApiRoutes';
import {ApiSettings} from '@components/ApiSettings';

import {Sidebar} from './Sidebar';

import * as S from './styled';

const ApiDetails = () => {
  const {pathname: apiPath} = useLocation();
  const dispatch = useDispatch();
  const selectedApi = useAppSelector(state => state.main.selectedApi);
  const [activeSection, setActiveSection] = useState<APIDetailsSections>('openapiBrowser');
  const pathArray = apiPath.split('/').filter(el => el);
  const {data: api} = useGetApiQuery(selectedApi ? skipToken : {namespace: pathArray[0], name: pathArray[1]});

  useEffect(() => {
    if (api) {
      dispatch(selectApi(api));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

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
