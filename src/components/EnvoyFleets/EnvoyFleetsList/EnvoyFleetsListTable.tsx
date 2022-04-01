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
    if (!envoyFleets?.length) {
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

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} tableLayout="fixed" />;
};

export default EnvoyFleetsListTable;
