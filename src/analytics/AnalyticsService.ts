import {KUSK_USER_ANALYTICS_ID} from '@constants/constants';

import {ANALYTIC_TYPE, AnalyticEvent} from '@models/analytics';

import {v4 as uuid} from '@lukeed/uuid';
import {AnalyticsBrowser} from '@segment/analytics-next';

let analytics: AnalyticsBrowser | null = null;

(function initSegmentService(): AnalyticsBrowser {
  if (analytics) {
    return analytics;
  }
  analytics = AnalyticsBrowser.load({
    writeKey: process.env.REACT_APP_SEGMENT_API_KEY!,
  });

  let userID = localStorage.getItem(KUSK_USER_ANALYTICS_ID);
  if (!userID) {
    userID = uuid();
    localStorage.setItem(KUSK_USER_ANALYTICS_ID, userID);
  }
  analytics.identify(userID);
  return analytics;
})();

export const trackEvent = (data: AnalyticEvent) => {
  const {type, page, eventName, ...rest} = data;
  switch (type) {
    case ANALYTIC_TYPE.PAGE:
      analytics?.page(page, rest);
      break;
    case ANALYTIC_TYPE.ACTION:
      analytics?.track(eventName, rest);
      break;
    default:
      break;
  }
};
