import {useEffect} from 'react';

import {notification} from 'antd';

import {AlertEnum} from '@models/alert';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {clearAlert} from '@redux/reducers/alert';

const NotificationBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector(state => state.alert.alert);

  useEffect(() => {
    if (!alert) {
      return;
    }

    let type: string =
      alert.type === AlertEnum.Error
        ? 'error'
        : alert.type === AlertEnum.Warning
        ? 'warning'
        : alert.type === AlertEnum.Success
        ? 'success'
        : 'info';

    // @ts-ignore
    notification[type]({
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
