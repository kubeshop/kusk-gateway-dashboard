import {LegacyRef, ReactNode, Suspense, useCallback, useMemo} from 'react';
import {ResizableBox} from 'react-resizable';
import {useMeasure} from 'react-use';

import {DASHBOARD_PANE_MIN_WIDTH} from '@constants/constants';

import {ApiItem, EnvoyFleetItem} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setDashboardPaneConfiguration} from '@redux/reducers/ui';

import * as S from './styled';

interface IProps {
  listElement: ReactNode;
  infoElement: ReactNode;
  selectedTableItem: ApiItem | EnvoyFleetItem | null;
}

const Dashboard: React.FC<IProps> = props => {
  const {listElement, infoElement, selectedTableItem} = props;

  const dispatch = useAppDispatch();
  const paneConfiguration = useAppSelector(state => state.ui.dashboardPaneConfiguration);
  const rightWidth = useAppSelector(state => state.ui.dashboardPaneConfiguration.rightPaneWidth);

  const [dashboardContainerRef, {width: dashboardWidth}] = useMeasure<HTMLDivElement>();
  const [dashboardItemInfoContainerRef, {height: rightPaneHeight, width: rightPaneWidth}] =
    useMeasure<HTMLDivElement>();

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
    <S.DashboardContainer ref={dashboardContainerRef} $isTableItemSelected={Boolean(selectedTableItem)}>
      {listElement}

      <Suspense fallback={null}>
        {selectedTableItem && (
          <S.DashboardItemInfoContainer ref={dashboardItemInfoContainerRef}>
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
              {infoElement}
            </ResizableBox>
          </S.DashboardItemInfoContainer>
        )}
      </Suspense>
    </S.DashboardContainer>
  );
};

export default Dashboard;
