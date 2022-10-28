import {Button, Dropdown, Menu, Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';

import EmptyLogs from './EmptyLogs';

import * as S from './styled';

const logs = [
  '[2022-10-21 07:40:18.711][7][info][main] [source/server/server.cc:390] initializing epoch 0 (base id=0, hot restart version=11.104)',
  '[2022-10-21 07:40:18.712][7][info][main] [source/server/server.cc:392] statically linked extensions:',
  '[2022-10-21 07:40:18.712][7][info][main] [source/server/server.cc:394]   envoy.compression.decompressor: envoy.compression.brotli.decompressor, envoy.compression.gzip.decompressor, envoy.compression.zstd.decompressor',
  '[2022-10-21 07:40:18.712][7][info][main] [source/server/server.cc:394]   envoy.health_checkers: envoy.health_checkers.redis',
  '[2022-10-21 07:40:18.712][7][info][main] [source/server/server.cc:394]   envoy.matching.common_inputs: envoy.matching.common_inputs.environment_variable',
  '[2022-10-21 07:40:18.712][7][info][main] [source/server/server.cc:394]   envoy.transport_sockets.downstream: envoy.transport_sockets.alts, envoy.transport_sockets.quic, envoy.transport_sockets.raw_buffer, envoy.transport_sockets.starttls, envoy.transport_sockets.tap, envoy.transport_sockets.tcp_stats, envoy.transport_sockets.tls, raw_buffer, starttls, tls',
  '[2022-10-21 07:40:18.712][7][info][main] [source/server/server.cc:394]   envoy.grpc_credentials: envoy.grpc_credentials.aws_iam, envoy.grpc_credentials.default, envoy.grpc_credentials.file_based_metadata',
  '[2022-10-21 07:40:18.712][7][info][main] [source/server/server.cc:394]   envoy.common.key_value: envoy.key_value.file_based',
  '[2022-10-21 07:40:18.712][7][info][main] [source/server/server.cc:394]   envoy.thrift_proxy.filters: envoy.filters.thrift.header_to_metadata, envoy.filters.thrift.rate_limit, envoy.filters.thrift.router',
  '[2022-10-21 07:40:18.712][7][info][main] [source/server/server.cc:394]   envoy.http.header_validators: envoy.http.header_validators.envoy_default',
  '[2022-10-21 07:40:18.712][7][info][main] [source/server/server.cc:394]   envoy.dubbo_proxy.serializers: dubbo.hessian2',
];

const columns = [
  {
    title: '',
    dataIndex: 'raw',
    key: 'key',
    render: (arg: any, {raw}: any) => {
      const onMenuClick = async (e: any) => {
        if ('clipboard' in navigator) {
          await navigator.clipboard.writeText(JSON.stringify(raw));
        } else {
          document.execCommand('copy', true, JSON.stringify(raw));
        }
      };

      const menu = (
        <Menu
          items={[
            {key: 1, label: 'Copy as raw', onClick: onMenuClick},
            {key: 2, label: 'Copy as JSON', onClick: onMenuClick},
          ]}
        />
      );

      return (
        <Dropdown overlay={menu} trigger={['contextMenu']} placement="bottomRight">
          <Typography.Text type="secondary">{raw}</Typography.Text>
        </Dropdown>
      );
    },
  },
];

const ApiLogging = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const dataSource = logs.map((l, i) => ({
    key: i,
    raw: l,
  }));

  const onCopyClickHandler = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(JSON.stringify(logs));
    } else {
      document.execCommand('copy', true, JSON.stringify(logs));
    }
  };

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
        <Button type="primary" onClick={onCopyClickHandler}>
          Copy logs as
        </Button>
      </S.Row>
      <S.Table columns={columns} dataSource={dataSource} pagination={false} />
    </S.Container>
  );
};

export default ApiLogging;
