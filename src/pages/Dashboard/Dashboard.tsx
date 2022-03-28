import React, {LegacyRef, Suspense, lazy, useCallback, useMemo} from 'react';
import {ResizableBox} from 'react-resizable';
import useMeasure from 'react-use/lib/useMeasure';

import {DASHBOARD_PANE_MIN_WIDTH} from '@constants/constants';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setDashboardPaneConfiguration} from '@redux/reducers/ui';

import {ApisList} from '@components';

import * as S from './styled';

const ApiInfo = lazy(() => import('@components/Dashboard/ApiInfo/ApiInfo'));

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const paneConfiguration = useAppSelector(state => state.ui.dashboardPaneConfiguration);
  const rightWidth = useAppSelector(state => state.ui.dashboardPaneConfiguration.rightPaneWidth);
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const [apiInfoContainerRef, {height: rightPaneHeight, width: rightPaneWidth}] = useMeasure<HTMLDivElement>();
  const [dashboardContainerRef, {width: dashboardWidth}] = useMeasure<HTMLDivElement>();

  const resizableHandler = useCallback(
    (_h: number, ref: LegacyRef<HTMLSpanElement>) => <span className="dashboard-custom-handle" ref={ref} />,
    []
  );

  const resizeRightPane = useCallback(() => {
    const newRightPaneWidthPercentage = rightPaneWidth / dashboardWidth;

    if (newRightPaneWidthPercentage !== paneConfiguration.rightPaneWidth) {
      dispatch(setDashboardPaneConfiguration({...paneConfiguration, rightPaneWidth: newRightPaneWidthPercentage}));
    }
  }, [dashboardWidth, dispatch, paneConfiguration, rightPaneWidth]);

  const dashboardContainerGridTemplateColumns = useMemo(() => {
    if (selectedApi) {
      return '1fr max-content';
    }

    return '1fr';
  }, [selectedApi]);

  const rightPaneResizableWidth = useMemo(() => {
    const paneWidth = dashboardWidth * rightWidth;

    return paneWidth < 460 ? 460 : paneWidth;
  }, [dashboardWidth, rightWidth]);

  return (
    <S.DashboardContainer ref={dashboardContainerRef} $gridTemplateColumns={dashboardContainerGridTemplateColumns}>
      <ApisList />

      <Suspense fallback={null}>
        {selectedApi && (
          <S.ApiInfoContainer ref={apiInfoContainerRef}>
            <ResizableBox
              height={rightPaneHeight}
              width={rightPaneResizableWidth}
              minConstraints={[DASHBOARD_PANE_MIN_WIDTH, rightPaneHeight]}
              maxConstraints={[dashboardWidth - DASHBOARD_PANE_MIN_WIDTH, rightPaneHeight]}
              axis="x"
              resizeHandles={['w']}
              handle={resizableHandler}
              onResizeStop={resizeRightPane}
            >
              <ApiInfo />
            </ResizableBox>
          </S.ApiInfoContainer>
        )}
      </Suspense>
    </S.DashboardContainer>
  );
};

export default Dashboard;
