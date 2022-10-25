import {useEffect} from 'react';

import {Modal, Typography} from 'antd';

import {AlertEnum} from '@models/alert';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {clearAlert} from '@redux/reducers/alert';

const ErrorAlertModal: React.VFC = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector(state => state.alert.alert);

  useEffect(() => {
    if (!alert || alert.type !== AlertEnum.Error) {
      return;
    }

    Modal.error({
      type: 'error',
      title: alert.title,
      content: (
        <div>
          <Typography.Text>{alert.description}</Typography.Text>
          <br />
          <br />
          <Typography.Text>
            If the issue persists or should you need help, please contact us on&nbsp;
            <Typography.Link href="https://discord.com/channels/884464549347074049/913784299273211905" target="_blank">
              Discord.
            </Typography.Link>
          </Typography.Text>
        </div>
      ),
      okText: 'Got it!',
      onOk: () => {
        dispatch(clearAlert());
      },
      cancelText: null,
    });
  }, [alert, dispatch]);

  return null;
};

export default ErrorAlertModal;
