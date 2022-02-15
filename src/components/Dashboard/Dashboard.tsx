import {Skeleton} from 'antd';
import {useMemo} from 'react';

import {useAppSelector} from 'src/redux/hooks';
import {ApiInfo} from '..';
import {useGetApis} from '../../models/api';

import DashboardAPIsTable from './DashboardAPIsTable';

import * as S from './styled';

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

      {selectedApi && <ApiInfo />}
    </S.DashboardContainer>
  );
};

export default Dashboard;
