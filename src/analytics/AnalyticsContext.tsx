import {FC} from 'react';
import {useTracking} from 'react-tracking';

import {AnalyticEvent} from '@models/analytics';

import {trackEvent} from './AnalyticsService';

const Tracker: FC = ({children}) => {
  const {Track} = useTracking<AnalyticEvent>(
    {},
    {
      dispatchOnMount: true,
      dispatch: data => trackEvent(data),
    }
  );
  return <Track>{children}</Track>;
};

export default Tracker;
