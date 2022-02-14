import {useCallback, useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from 'src/redux/hooks';
import {selectApi} from 'src/redux/reducers/main';

import * as S from './styled';

const apisFromEndpoint = [
  {
    name: 'API 1',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    status: 'published',
    fleet: {name: 'Fleet 1', namespace: 'fleet-1-namespace'},
    service: {name: 'Service 1', namespace: 'service-1-namespace'},
  },
  {
    name: 'API 2',
    id: '4ad12f64-5717-4218-b3fc-2c964a16afb1',
    status: 'unpublished',
    fleet: {name: 'Fleet 2', namespace: 'fleet-2-namespace'},
    service: {name: 'Service 2', namespace: 'service-2-namespace'},
  },
];

const renderStatusTag = (status: 'published' | 'unpublished') => {
  if (status === 'published') {
    return <S.TrueTag>Published</S.TrueTag>;
  }

  return <S.FalseTag>Unpublished</S.FalseTag>;
};

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedApi = useAppSelector(state => state.main.selectedApi);

  const renderApiName = useCallback(
    (name: string, record: any) => {
      const {key} = record;

      return <S.ApiLabel $selected={key === selectedApi}>{name}</S.ApiLabel>;
    },
    [selectedApi]
  );

  const renderServicesTag = useCallback(
    (status: 'available' | 'unavailable', record: any) => {
      const {key} = record;

      let tag = <S.FalseTag>Unavailable</S.FalseTag>;

      if (status === 'available') {
        tag = <S.TrueTag>Available</S.TrueTag>;
      }

      return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          {tag}

          <S.RightOutlined
            $disabled={key === selectedApi}
            onClick={() => {
              if (key !== selectedApi) {
                dispatch(selectApi(key));
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
    {title: 'Status', dataIndex: 'status', key: 'status', render: renderStatusTag, width: '25%'},
    {title: 'Services', dataIndex: 'services', key: 'services', render: renderServicesTag, width: '25%'},
  ];

  // pretend we get them from redux maybe or directly a local state
  const apis = apisFromEndpoint;

  const [dataSource, setDataSource] = useState<
    {
      name: string;
      status: 'published' | 'unpublished';
      services: 'available' | 'unavailable';
    }[]
  >([]);

  useEffect(() => {
    const getTableDataSource = async () => {
      // for each api, get the service from the endpoint in order to get the service status
      let tableDataSource: {
        key: string;
        name: string;
        status: 'published' | 'unpublished';
        services: 'available' | 'unavailable';
      }[] = [];

      for (let i = 0; i < apisFromEndpoint.length; i += 1) {
        const api = apisFromEndpoint[i];
        // TODO: might be useful to have a Promise all for better performance
        // const service = await getService({namespace: api.service.namespace, name: api.service.name});
        const service: {name: string; namespace: string; status: 'available' | 'unavailable'} = {
          name: api.service.name,
          namespace: api.service.namespace,
          status: i % 2 ? 'unavailable' : 'available',
        };

        tableDataSource.push({
          key: api.id,
          name: api.name,
          status: api.status as 'published',
          services: service.status,
        });
      }

      setDataSource(tableDataSource);
    };

    getTableDataSource();
  }, [apis]);

  return (
    <S.DashboardContainer>
      <S.DashboardTitle>APIs</S.DashboardTitle>

      <S.Table columns={columns} dataSource={dataSource} pagination={false} tableLayout="fixed" />
    </S.DashboardContainer>
  );
};

export default Dashboard;
