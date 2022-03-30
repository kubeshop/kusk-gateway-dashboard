import {LegacyRef, Suspense, useCallback, useMemo} from 'react';
import {ResizableBox} from 'react-resizable';
import useMeasure from 'react-use/lib/useMeasure';

import {DASHBOARD_PANE_MIN_WIDTH} from '@constants/constants';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setDashboardPaneConfiguration} from '@redux/reducers/ui';

import {EnvoyFleetInfo, EnvoyFleetsList} from '@components';

import * as S from './styled';

const EnvoyFleets: React.FC = () => {
  const dispatch = useAppDispatch();
  const paneConfiguration = useAppSelector(state => state.ui.dashboardPaneConfiguration);
  const rightWidth = useAppSelector(state => state.ui.dashboardPaneConfiguration.rightPaneWidth);
  const selectedEnvoyFleet = useAppSelector(state => state.main.selectedEnvoyFleet);

  const [envoyFleetInfoContainerRef, {height: rightPaneHeight, width: rightPaneWidth}] = useMeasure<HTMLDivElement>();
  const [envoyFleetsContainerRef, {width: dashboardWidth}] = useMeasure<HTMLDivElement>();

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

  const rightPaneResizableWidth = useMemo(() => {
    const paneWidth = dashboardWidth * rightWidth;

    return paneWidth < 460 ? 460 : paneWidth;
  }, [dashboardWidth, rightWidth]);

  return (
    <S.EnvoyFleetsContainer ref={envoyFleetsContainerRef} $isEnvoyFleetSelected={Boolean(selectedEnvoyFleet)}>
      <EnvoyFleetsList />

      <Suspense fallback={null}>
        {selectedEnvoyFleet && (
          <S.EnvoyFleetInfoContainer ref={envoyFleetInfoContainerRef}>
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
              <EnvoyFleetInfo />
            </ResizableBox>
          </S.EnvoyFleetInfoContainer>
        )}
      </Suspense>
    </S.EnvoyFleetsContainer>
  );
};

export default EnvoyFleets;
