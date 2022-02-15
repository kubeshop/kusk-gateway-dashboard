import {Skeleton} from 'antd';

import {useGetApis} from '../../models/api';
import DashboardAPIsTable from './DashboardAPIsTable';

import * as S from './styled';

const Dashboard: React.FC = () => {
  const {data, error, loading} = useGetApis({});

  return (
    <S.DashboardContainer>
      <S.DashboardTitle>APIs</S.DashboardTitle>

      {loading ? (
        <Skeleton />
      ) : error ? (
        <S.ErrorLabel>{error.message}</S.ErrorLabel>
      ) : (
        data && <DashboardAPIsTable apis={data} />
      )}
    </S.DashboardContainer>
  );
};

export default Dashboard;
