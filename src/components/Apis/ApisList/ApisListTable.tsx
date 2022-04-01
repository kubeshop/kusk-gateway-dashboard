import {useMemo} from 'react';

import {ApiItem} from '@models/api';

import {useAppSelector} from '@redux/hooks';

import {ListTableColumnLabel} from '@components';

import {getApiKey} from '@utils/api';

import * as S from './ApisListTable.styled';
import ApisListTableServicesTag from './ApisListTableServicesTag';

interface IProps {
  apis: ApiItem[];
}

const ApisListTable: React.FC<IProps> = props => {
  const {apis} = props;

  const selectedApi = useAppSelector(state => state.main.selectedApi);
  const selectedApiKey = useMemo(() => getApiKey(selectedApi), [selectedApi]);

  const dataSource = useMemo(() => {
    if (!apis.length) {
      return [];
    }

    return apis.map(api => ({
      key: getApiKey(api),
      name: api.name,
      version: api.version,
      apiItem: api,
    }));
  }, [apis]);

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
    {
      title: 'Services',
      dataIndex: 'services',
      key: 'services',
      render: (_: any, record: any) => (
        <ApisListTableServicesTag api={record.apiItem} apiKey={record.key} selectedApiKey={selectedApiKey} />
      ),
      width: '35%',
    },
  ];

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} tableLayout="fixed" />;
};

export default ApisListTable;
