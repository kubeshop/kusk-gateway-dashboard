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

    const getTableDataSource = () => {
      let tableDataSource: ApisTableDataSourceItem[] = [];

      for (let i = 0; i < apis.length; i += 1) {
        const api = apis[i];

        tableDataSource.push({
          key: `${api.namespace}-${api.name}`,
          name: api.name,
          version: api.version,
          apiItem: api,
        });
      }

      setDataSource(tableDataSource);
    };

    getTableDataSource();
  }, [apis]);

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} tableLayout="fixed" />;
};

export default ApisListTable;
