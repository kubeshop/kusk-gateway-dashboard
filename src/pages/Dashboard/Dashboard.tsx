import React, {Suspense, lazy, useMemo, useState} from 'react';

import {Select, Skeleton, Tag, Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';
import {EnvoyFleetInfoTooltip} from '@constants/tooltips';

import {EnvoyFleetItem, useGetApis, useGetEnvoyFleets} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {toggleEnvoyFleetInfoModal} from '@redux/reducers/ui';

import {ApisTable, EnvoyFleetInfoModal} from '@components';

import * as S from './styled';

const {Option} = Select;

const ApiInfo = lazy(() => import('@components/Dashboard/ApiInfo/ApiInfo'));

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const envoyFleet = useAppSelector(state => state.ui.envoyFleetModal.envoyFleet);
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const [selectedFleet, setSelectedFleet] = useState<EnvoyFleetItem>();

  const {data, error, loading} = useGetApis({queryParams: {fleet: selectedFleet?.id || ''}});

  const envoyFleetsState = useGetEnvoyFleets({});

  const dashboardContainerGridTemplateColumns = useMemo(() => {
    if (selectedApi) {
      return 'repeat(2, 1fr)';
    }

    return '1fr';
  }, [selectedApi]);

  const onEnvoyFleetSelectHandler = (envoyFleetItem: EnvoyFleetItem) => {
    setSelectedFleet(envoyFleetItem);
  };

  const onEnvoyFleetInfoIconClickHandler = () => {
    if (!selectedFleet) {
      return;
    }

    dispatch(toggleEnvoyFleetInfoModal({name: selectedFleet.name, namespace: selectedFleet.namespace}));
  };

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
                  onClear={() => setSelectedFleet(undefined)}
                  allowClear
                  placeholder="Select a fleet"
                  showSearch
                  onSelect={(value: any, option: any) => {
                    onEnvoyFleetSelectHandler(option.envoyfleet);
                  }}
                >
                  {envoyFleetsState.data.map(envoyFleetItem => (
                    <Option key={envoyFleetItem.id} value={envoyFleetItem.name} envoyfleet={envoyFleetItem}>
                      <Tag>{envoyFleetItem.namespace}</Tag>
                      {envoyFleetItem.name}
                    </Option>
                  ))}
                </S.Select>
              )
            )}

            {selectedFleet && (
              <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={EnvoyFleetInfoTooltip}>
                <S.QuestionCircleOutlined onClick={onEnvoyFleetInfoIconClickHandler} />
              </Tooltip>
            )}
          </S.EnvoyFleetFilterContainer>
        </S.DashboardTitleContainer>

        {loading ? (
          <Skeleton />
        ) : error ? (
          <S.ErrorLabel>{error.message}</S.ErrorLabel>
        ) : (
          data && <ApisTable apis={data} />
        )}
      </S.ApisContainer>

      <Suspense fallback={null}>
        {selectedApi && <ApiInfo />}
        {envoyFleet && <EnvoyFleetInfoModal />}
      </Suspense>
    </S.DashboardContainer>
  );
};

export default Dashboard;
