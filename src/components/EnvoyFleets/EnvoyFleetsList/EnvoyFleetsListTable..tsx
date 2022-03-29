import {useEffect, useState} from 'react';

import {EnvoyFleetItem} from '@models/api';
import {EnvoyFleetsTableDataSourceItem} from '@models/dashboard';

import * as S from './EnvoyFleetsListTable.styled';

interface IProps {
  envoyFleets: EnvoyFleetItem[];
}

const EnvoyFleetsListTable: React.FC<IProps> = props => {
  const {envoyFleets} = props;

  const [dataSource, setDataSource] = useState<EnvoyFleetsTableDataSourceItem[]>([]);

  const columns = [
    {title: 'Name', dataIndex: 'name', key: 'name'},
    {title: 'Namespace', dataIndex: 'namespace', key: 'namespace'},
  ];

  useEffect(() => {
    if (!envoyFleets?.length) {
      return;
    }

    let tableDataSource: EnvoyFleetsTableDataSourceItem[] = envoyFleets.map(envoyFleet => ({
      key: `${envoyFleet.namespace}-${envoyFleet.name}`,
      name: envoyFleet.name,
      namespace: envoyFleet.namespace,
    }));

    setDataSource(tableDataSource);
  }, [envoyFleets]);

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} tableLayout="fixed" />;
};

export default EnvoyFleetsListTable;
