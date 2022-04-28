import React, {useMemo} from 'react';

import {EnvoyFleetItem} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectEnvoyFleet} from '@redux/reducers/main';

import {ListTableColumnLabel} from '@components';

import {getEnvoyFleetKey} from '@utils/envoyFleet';

import * as S from './EnvoyFleetsListTable.styled';

interface IProps {
  envoyFleets: EnvoyFleetItem[];
}

const EnvoyFleetsListTable: React.FC<IProps> = props => {
  const {envoyFleets} = props;

  const dispatch = useAppDispatch();
  const selectedEnvoyFleet = useAppSelector(state => state.main.selectedEnvoyFleet);

  const dataSource = useMemo(() => {
    if (!envoyFleets?.length || !Array.isArray(envoyFleets)) {
      return [];
    }

    return envoyFleets.map(envoyFleet => ({
      key: getEnvoyFleetKey(envoyFleet),
      name: envoyFleet.name,
      namespace: envoyFleet.namespace,
      envoyFleetItem: envoyFleet,
    }));
  }, [envoyFleets]);

  const selectedEnvoyFleetKey = useMemo(() => getEnvoyFleetKey(selectedEnvoyFleet), [selectedEnvoyFleet]);

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
        <ListTableColumnLabel itemKey={record.key} selectedKey={selectedEnvoyFleetKey} value={value} showSelectArrow />
      ),
    },
  ];

  return (
    <S.Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      tableLayout="fixed"
      rowClassName={(record: {[key: string]: any}) => {
        const {key} = record;

        return key === selectedEnvoyFleetKey ? 'custom-antd-table-selected-row' : '';
      }}
      onRow={(record: {[key: string]: any}) => ({
        onClick: () => {
          const {envoyFleetItem, key} = record;

          if (!selectedEnvoyFleetKey || key !== selectedEnvoyFleetKey) {
            dispatch(selectEnvoyFleet(envoyFleetItem));
          }
        },
      })}
    />
  );
};

export default EnvoyFleetsListTable;
