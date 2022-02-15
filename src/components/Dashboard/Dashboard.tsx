import React, {Suspense, useMemo} from 'react';
import {Skeleton} from 'antd';

import {useAppSelector} from 'src/redux/hooks';
import {useGetApis} from '../../models/api';

import DashboardAPIsTable from './DashboardAPIsTable';

import * as S from './styled';

const ApiInfo = React.lazy(() => import('../ApiInfo/ApiInfo'));

const Dashboard: React.FC = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetApis({});

  const dashboardContainerGridTemplateColumns = useMemo(() => {
    if (selectedApi) {
      return 'repeat(2, 1fr)';
    }

    return '1fr';
  }, [selectedApi]);

  return (
    <S.DashboardContainer $gridTemplateColumns={dashboardContainerGridTemplateColumns}>
      <S.ApisContainer>
        <S.DashboardTitle>APIs</S.DashboardTitle>

        {loading ? (
          <Skeleton />
        ) : error ? (
          <S.ErrorLabel>{error.message}</S.ErrorLabel>
        ) : (
          data && <DashboardAPIsTable apis={data} />
        )}
      </S.ApisContainer>

      <Suspense fallback={null}>{selectedApi && <ApiInfo />}</Suspense>
    </S.DashboardContainer>
  );
};

export default Dashboard;
