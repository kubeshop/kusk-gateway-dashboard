import React, {Suspense, lazy, useMemo} from 'react';

import {useAppSelector} from '@redux/hooks';

import {ApisList} from '@components';

import * as S from './styled';

const ApiInfo = lazy(() => import('@components/Dashboard/ApiInfo/ApiInfo'));

const Dashboard: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const dashboardContainerGridTemplateColumns = useMemo(() => {
    if (selectedApi) {
      return 'repeat(2, 1fr)';
    }

    return '1fr';
  }, [selectedApi]);

  return (
    <S.DashboardContainer $gridTemplateColumns={dashboardContainerGridTemplateColumns}>
      <ApisList />

      <Suspense fallback={null}>{selectedApi && <ApiInfo />}</Suspense>
    </S.DashboardContainer>
  );
};

export default Dashboard;
