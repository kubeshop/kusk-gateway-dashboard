import React, {Suspense, useMemo, useState} from 'react';

import {Select, Skeleton, Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';
import {EnvoyFleetInfoTooltip} from '@constants/tooltips';

import {useGetApis, useGetEnvoyFleets} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import DashboardAPIsTable from './DashboardAPIsTable';

import * as S from './styled';

const {Option} = Select;

const ApiInfo = React.lazy(() => import('../ApiInfo/ApiInfo'));

const Dashboard: React.FC = () => {
  const [selectedFleet, setSelectedFleet] = useState<string>('');

  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const {data, error, loading} = useGetApis({queryParams: {fleet: selectedFleet}});

  const envoyFleetsState = useGetEnvoyFleets({});

  const dashboardContainerGridTemplateColumns = useMemo(() => {
    if (selectedApi) {
      return 'repeat(2, 1fr)';
    }

    return '1fr';
  }, [selectedApi]);

  return (
    <S.DashboardContainer $gridTemplateColumns={dashboardContainerGridTemplateColumns}>
      <S.ApisContainer>
        <S.DashboardTitleContainer>
          <S.DashboardTitleLabel>APIs</S.DashboardTitleLabel>

          <S.EnvoyFleetFilterContainer>
            {envoyFleetsState.loading ? (
              <Skeleton.Button />
            ) : envoyFleetsState.error ? (
              <S.ErrorLabel>{envoyFleetsState.error.message}</S.ErrorLabel>
            ) : (
              envoyFleetsState.data && (
                <S.Select
                  allowClear
                  placeholder="Select a fleet"
                  showSearch
                  onChange={value => setSelectedFleet(value as string)}
                >
                  {envoyFleetsState.data.map(({id, name}) => (
                    <Option key={id} value={name.toLowerCase()}>
                      {name}
                    </Option>
                  ))}
                  <Option value="test">Test</Option>
                </S.Select>
              )
            )}

            {selectedFleet && (
              <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={EnvoyFleetInfoTooltip}>
                <S.QuestionCircleOutlined />
              </Tooltip>
            )}
          </S.EnvoyFleetFilterContainer>
        </S.DashboardTitleContainer>

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
