import {useMemo} from 'react';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';
import {ApiItem} from '@redux/services/kuskApi';

import {ListTableColumnLabel} from '@components';

import {getApiKey} from '@utils/api';

import * as S from './ApisListTable.styled';

interface IProps {
  apis: ApiItem[];
}

const ApisListTable: React.FC<IProps> = props => {
  const {apis} = props;

  const dispatch = useAppDispatch();
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const dataSource = useMemo(() => {
    if (!apis.length || !Array.isArray(apis)) {
      return [];
    }

    return apis.map(api => ({
      key: getApiKey(api),
      name: api.name,
      version: api.version,
      apiItem: api,
    }));
  }, [apis]);
  const selectedApiKey = useMemo(() => getApiKey(selectedApi), [selectedApi]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value: string, record: any) => (
        <ListTableColumnLabel itemKey={record.key} selectedKey={selectedApiKey} value={value} />
      ),
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      render: (value: string, record: any) => (
        <ListTableColumnLabel itemKey={record.key} selectedKey={selectedApiKey} value={value} />
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

        return key === selectedApiKey ? 'custom-antd-table-selected-row' : '';
      }}
      onRow={(record: {[key: string]: any}) => ({
        onClick: () => {
          const {apiItem, key} = record;

          if (!selectedApiKey || key !== selectedApiKey) {
            dispatch(selectApi(apiItem));
          }
        },
      })}
    />
  );
};

export default ApisListTable;
