import {useCallback, useEffect, useState} from 'react';

import {ApiItem} from '@models/api';
import {ApisTableDataSourceItem} from '@models/dashboard';

import {useAppSelector} from '@redux/hooks';

import * as S from './ApisListTable.styled';
import ApisListTableServicesTag from './ApisListTableServicesTag';

interface IProps {
  apis: ApiItem[];
}

const ApisListTable: React.FC<IProps> = props => {
  const {apis} = props;

  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const [dataSource, setDataSource] = useState<ApisTableDataSourceItem[]>([]);

  const renderColumnLabel = useCallback(
    (columnKey: string, record: any) => {
      const {key} = record;

      return <S.ApiLabel $selected={key === `${selectedApi?.namespace}-${selectedApi?.name}`}>{columnKey}</S.ApiLabel>;
    },
    [selectedApi]
  );

  const columns = [
    {title: 'Name', dataIndex: 'name', key: 'name', render: renderColumnLabel},
    {title: 'Version', dataIndex: 'version', key: 'version', render: renderColumnLabel},
    {
      title: 'Services',
      dataIndex: 'services',
      key: 'services',
      render: (_: any, record: any) => <ApisListTableServicesTag api={record.apiItem} apiKey={record.key} />,
      width: '35%',
    },
  ];

  useEffect(() => {
    if (!apis.length) {
      return;
    }

    let tableDataSource: ApisTableDataSourceItem[] = apis.map(api => ({
      key: `${api.namespace}-${api.name}`,
      name: api.name,
      version: api.version,
      apiItem: api,
    }));

    setDataSource(tableDataSource);
  }, [apis]);

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} tableLayout="fixed" />;
};

export default ApisListTable;
