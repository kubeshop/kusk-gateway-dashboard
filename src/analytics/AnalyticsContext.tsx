import {FC} from 'react';
import {useTracking} from 'react-tracking';

import {AnalyticEvent} from '@models/analytics';

const Tracker: FC = ({children}) => {
  const {Track} = useTracking<AnalyticEvent>(
    {},
    {
      dispatchOnMount: true,
    }
  );
  return <Track>{children}</Track>;
};

export default Tracker;
