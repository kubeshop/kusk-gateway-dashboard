import {Button, Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';

import CORS from './CORS';
import PathInfo from './PathInfo';
import PathTarget from './PathTarget';
import QOS from './QOS';
import Websocket from './Websocket';

import * as S from './styled';

const {TabPane} = S.Tabs;

const PathSettings = () => {
  const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);

  return (
    <div style={{position: 'relative'}}>
      <S.Header>
        <Typography.Title level={3}>{selectedRoutePath}</Typography.Title>
        <Button danger type="primary">
          Delete path
        </Button>
      </S.Header>

      <S.Tabs>
        <TabPane tab="Path Info" key="1">
          <PathInfo />
        </TabPane>
        <TabPane tab="Target" key="2">
          <PathTarget />
        </TabPane>
        <TabPane tab="QoS" key="3">
          <QOS />
        </TabPane>
        <TabPane tab="CORS" key="4">
          <CORS />
        </TabPane>
        <TabPane tab="WebSocket" key="5">
          <Websocket />
        </TabPane>
      </S.Tabs>
    </div>
  );
};

export default PathSettings;
