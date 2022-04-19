import {useEffect} from 'react';

import {notification} from 'antd';

import {alertTypes} from '@models/alert';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {clearAlert} from '@redux/reducers/alert';

const NotificationBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector(state => state.alert.alert);

  useEffect(() => {
    if (!alert) {
      return;
    }

    const alertType = alertTypes[alert.type];

    // @ts-ignore
    notification[alertType]({
      message: alert.title,
      description: alert.description,
      duration: alert.duration || 5,
      placement: alert.placement || 'bottomRight',
    });

    dispatch(clearAlert());
  }, [alert, dispatch]);

  return null;
};

export default NotificationBox;
