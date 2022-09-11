import {useDispatch} from 'react-redux';

import {Typography} from 'antd';

import {CloseOutlined} from '@ant-design/icons';

import {useAppSelector} from '@redux/hooks';
import {selectStaticRoutePath} from '@redux/reducers/main';

import CORS from './CORS';
import PathInfo from './PathInfo';
import PathTarget from './PathTarget';
import QOS from './QOS';
import Websocket from './Websocket';

import * as S from './styled';

const {TabPane} = S.Tabs;

const PathSettings = () => {
  const dispatch = useDispatch();
  const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);

  const onDismissClickHandler = () => {
    dispatch(selectStaticRoutePath(null));
  };
  return (
    <div style={{position: 'relative'}}>
      <Typography.Title level={3}>{selectedRoutePath}</Typography.Title>

      <CloseOutlined style={{position: 'absolute', right: 0, top: 8, fontSize: 16}} onClick={onDismissClickHandler} />

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
