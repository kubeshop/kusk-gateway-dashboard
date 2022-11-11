import {useEffect, useRef} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import uuid from 'react-uuid';

import {Button, Dropdown, Menu, Typography} from 'antd';

import {useImmerReducer} from 'use-immer';

import {useAppSelector} from '@redux/hooks';

import {getWebsocketURl} from '@utils/api';

import EmptyLogs from './EmptyLogs';

import * as S from './styled';

const ApiLogging = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);
  const baseApi = useAppSelector(state => state.main.apiEndpoint);
  const logsContinerRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<Array<string>>([]);
  const data = logsRef.current;

  const [{logs}, dispatch] = useImmerReducer<{logs: Array<string>; hasMore: boolean}>(
    (draft, action) => {
      switch (action.type) {
        case 'hasMore':
          draft.logs.push(...action.payload);
          draft.hasMore = true;
          break;
        default:
          break;
      }
    },
    {logs: [], hasMore: false}
  );

  useEffect(() => {
    const logsUrl = getWebsocketURl(baseApi, window.location);
    const ws = new WebSocket(logsUrl);
    const listener = async (event: MessageEvent) => {
      logsRef.current.push(event.data);
    };
    const connect = async () => {
      try {
        ws.addEventListener('message', listener, {passive: true});
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('error', e);
      }
    };
    connect().then();
    return () => {
      ws.removeEventListener('message', listener);
      ws?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCopyClickHandler = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(JSON.stringify(data));
    } else {
      document.execCommand('copy', true, JSON.stringify(data));
    }
  };

  useEffect(() => {
    const TIMEOUTID = setTimeout(() => {
      dispatch({type: 'hasMore', payload: data.slice(logs.length, data.length)});
      return () => clearTimeout(TIMEOUTID);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFunc = () => {
    if (data.length !== logs.length) {
      dispatch({type: 'hasMore', payload: data.slice(logs.length, data.length)});
    }
  };

  const copyMenu = (
    <Menu
      items={[
        {key: 1, label: 'Copy as raw', onClick: onCopyClickHandler},
        // {key: 2, label: 'Copy as JSON', onClick: onMenuClick},
      ]}
    />
  );

  return logs.length === 0 ? (
    <EmptyLogs />
  ) : (
    <S.Container>
      <S.H1>Request Logs</S.H1>
      <S.Row>
        <Typography.Text type="secondary">
          View request logs for all APIs deployed with deployment fleet&nbsp;
          {selectedApi?.fleet?.name}.
        </Typography.Text>
        <Dropdown
          key={uuid()}
          overlay={copyMenu}
          overlayClassName="copy-dropdown-menu"
          trigger={['click']}
          placement="bottomRight"
        >
          <Button type="primary">Copy logs as</Button>
        </Dropdown>
      </S.Row>

      <S.LogContainer ref={logsContinerRef}>
        <InfiniteScroll
          getScrollParent={() => logsContinerRef.current}
          threshold={200}
          pageStart={0}
          loadMore={loadFunc}
          hasMore
          initialLoad={false}
          useWindow={false}
        >
          {logs.map(i => {
            const onMenuClick = async () => {
              if ('clipboard' in navigator) {
                await navigator.clipboard.writeText(JSON.stringify(i));
              } else {
                document.execCommand('copy', true, JSON.stringify(i));
              }
            };
            const menu = (
              <Menu
                items={[
                  {key: 1, label: 'Copy as raw', onClick: onMenuClick},
                  // {key: 2, label: 'Copy as JSON', onClick: onMenuClick},
                ]}
              />
            );
            return (
              <Dropdown
                key={uuid()}
                overlay={menu}
                overlayClassName="copy-dropdown-menu"
                trigger={['contextMenu']}
                placement="bottomRight"
              >
                <S.LogText>{i}</S.LogText>
              </Dropdown>
            );
          })}
        </InfiniteScroll>
      </S.LogContainer>
    </S.Container>
  );
};

export default ApiLogging;
