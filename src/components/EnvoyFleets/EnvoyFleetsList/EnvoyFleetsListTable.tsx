import React, {useEffect, useMemo, useState} from 'react';

import {EnvoyFleetItem} from '@models/api';
import {EnvoyFleetsTableDataSourceItem} from '@models/dashboard';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectEnvoyFleet} from '@redux/reducers/main';

import {ListTableColumnLabel} from '@components';

import * as S from './EnvoyFleetsListTable.styled';

interface IProps {
  envoyFleets: EnvoyFleetItem[];
}

const EnvoyFleetsListTable: React.FC<IProps> = props => {
  const {envoyFleets} = props;

  const dispatch = useAppDispatch();
  const selectedEnvoyFleet = useAppSelector(state => state.main.selectedEnvoyFleet);

  const [dataSource, setDataSource] = useState<EnvoyFleetsTableDataSourceItem[]>([]);

  const selectedEnvoyFleetKey = useMemo(() => {
    if (!selectEnvoyFleet) {
      return null;
    }

    return `${selectedEnvoyFleet?.namespace}-${selectedEnvoyFleet?.name}`;
  }, [selectedEnvoyFleet]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value: string, record: any) => (
        <ListTableColumnLabel itemKey={record.key} selectedKey={selectedEnvoyFleetKey} value={value} />
      ),
    },
    {
      title: 'Namespace',
      dataIndex: 'namespace',
      key: 'namespace',
      render: (value: string, record: any) => (
        <ListTableColumnLabel
          itemKey={record.key}
          selectedKey={selectedEnvoyFleetKey}
          value={value}
          showSelectArrow
          onSelectArrowClick={() => dispatch(selectEnvoyFleet(record.envoyFleetItem))}
        />
      ),
    },
  ];

  useEffect(() => {
    if (!envoyFleets?.length) {
      return;
    }

    let tableDataSource: EnvoyFleetsTableDataSourceItem[] = envoyFleets.map(envoyFleet => ({
      key: `${envoyFleet.namespace}-${envoyFleet.name}`,
      name: envoyFleet.name,
      namespace: envoyFleet.namespace,
      envoyFleetItem: envoyFleet,
    }));

    setDataSource(tableDataSource);
  }, [envoyFleets]);

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} tableLayout="fixed" />;
};

export default EnvoyFleetsListTable;
