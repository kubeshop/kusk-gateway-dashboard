import {useCallback, useEffect, useState} from 'react';

import {ApiItem} from '@models/api';
import {ApisTableDataSourceItem} from '@models/dashboard';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApi} from '@redux/reducers/main';

import * as S from './ApisListTable.styled';

interface IProps {
  apis: ApiItem[];
}

const ApisListTable: React.FC<IProps> = props => {
  const {apis} = props;

  const dispatch = useAppDispatch();
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const [dataSource, setDataSource] = useState<ApisTableDataSourceItem[]>([]);

  const renderApiName = useCallback(
    (name: string, record: any) => {
      const {key} = record;

      return <S.ApiLabel $selected={key === `${selectedApi?.namespace}-${selectedApi?.name}`}>{name}</S.ApiLabel>;
    },
    [selectedApi]
  );

  const renderServicesTag = useCallback(
    (status: 'available' | 'unavailable', record: any) => {
      const {apiItem, key} = record;
      const selectedApiKey = `${selectedApi?.namespace}-${selectedApi?.name}`;

      let tag = <S.FalseTag>Unavailable</S.FalseTag>;

      if (status === 'available') {
        tag = <S.TrueTag>Available</S.TrueTag>;
      }

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {tag}

          <S.RightOutlined
            $disabled={key === selectedApiKey}
            onClick={() => {
              if (!selectedApi || key !== selectedApiKey) {
                dispatch(selectApi(apiItem));
              }
            }}
          />
        </div>
      );
    },
    [dispatch, selectedApi]
  );

  const columns = [
    {title: 'Name', dataIndex: 'name', key: 'name', render: renderApiName},
    {
      title: 'Services',
      dataIndex: 'services',
      key: 'services',
      render: renderServicesTag,
      width: '35%',
    },
  ];

  useEffect(() => {
    if (!apis.length) {
      return;
    }
    const getTableDataSource = async () => {
      // for each api, get the service from the endpoint in order to get the service status
      let tableDataSource: ApisTableDataSourceItem[] = [];

      for (let i = 0; i < apis.length; i += 1) {
        const api = apis[i];
        // TODO: might be useful to have a Promise all for better performance
        // eslint-disable-next-line react-hooks/rules-of-hooks

        // const service: {
        //   name: string;
        //   namespace: string;
        //   status: 'available' | 'unavailable';
        // } = {
        //   name: api.service.name,
        //   namespace: api.service.namespace,
        //   status: i % 3 ? 'available' : 'unavailable',
        // };

        tableDataSource.push({
          key: `${api.namespace}-${api.name}`,
          name: api.name,
          apiItem: api,
          services: 'available',
        });
      }

      setDataSource(tableDataSource);
    };

    getTableDataSource();
  }, [apis]);

  return <S.Table columns={columns} dataSource={dataSource} pagination={false} tableLayout="fixed" />;
};

export default ApisListTable;
