import {useEffect, useState} from 'react';
import * as S from './styled';

const apisFromEndpoint = [
  {
    name: 'API 1',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    status: 'published',
    fleet: {name: 'Fleet 1', namespace: 'fleet-1-namespace'},
    service: {name: 'Service 1', namespace: 'service-1-namespace'},
  },
];

const columns = [
  {title: 'Name', dataIndex: 'name', key: 'name'},
  {title: 'Status', dataIndex: 'status', key: 'status'},
  {title: 'Services', dataIndex: 'services', key: 'services'},
];

const Dashboard: React.FC = () => {
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
          status: 'available',
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

      <S.Table columns={columns} dataSource={dataSource} pagination={false} />
    </S.DashboardContainer>
  );
};

export default Dashboard;
