import {useRef} from 'react';
import uuid from 'react-uuid';

import {Button, Dropdown, Menu, Typography} from 'antd';

import {useVirtualizer} from '@tanstack/react-virtual';

import {useAppSelector} from '@redux/hooks';
import {useGetEnvoyFleetLogsQuery} from '@redux/services/enhancedApi';

import EmptyLogs from './EmptyLogs';

import * as S from './styled';

const LOG_ROW_HEIGHT = 24;

const ApiLogging = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<Array<string>>([]);
  const data = logsRef.current;
  const {data: logsData = []} = useGetEnvoyFleetLogsQuery({
    namespace: selectedApi?.fleet?.namespace || '',
    name: selectedApi?.fleet?.name || '',
  });
  const rowVirtualizer = useVirtualizer({
    count: logsData.length,
    getScrollElement: () => logsContainerRef.current,
    estimateSize: () => LOG_ROW_HEIGHT,
    overscan: 5,
  });

  const onCopyClickHandler = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(JSON.stringify(data));
    } else {
      document.execCommand('copy', true, JSON.stringify(data));
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

  return logsData.length === 0 ? (
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

      <S.LogContainer ref={logsContainerRef}>
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const i = logsData[virtualRow.index];
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
              <div
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <Dropdown
                  key={uuid()}
                  overlay={menu}
                  overlayClassName="copy-dropdown-menu"
                  trigger={['contextMenu']}
                  placement="bottomRight"
                >
                  <S.LogText>{i}</S.LogText>
                </Dropdown>
              </div>
            );
          })}
        </div>
      </S.LogContainer>
    </S.Container>
  );
};

export default ApiLogging;
