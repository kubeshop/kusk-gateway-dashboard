import {Typography} from 'antd';

import EmptyAPiLogs from '@assets/EmptyAPiLogs.svg';

import * as S from './EmptyLogs.styled';

const EmptyLogs = () => {
  return (
    <S.Container>
      <Typography.Title>Request Logs</Typography.Title>
      <S.Content>
        <img src={EmptyAPiLogs} />
        <Typography.Title level={2}>No requests logged for the fleet of this API yet.</Typography.Title>
        <Typography.Text type="secondary">
          Logging will begin once a request is made during this session.&nbsp;
          <br />
          <Typography.Link>Learn more.</Typography.Link>
        </Typography.Text>
      </S.Content>
    </S.Container>
  );
};

export default EmptyLogs;
