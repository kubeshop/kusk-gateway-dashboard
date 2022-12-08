import {useNavigate, useParams} from 'react-router-dom';

import {Typography} from 'antd';

import {useGetStaticRouteCrdQuery} from '@redux/services/enhancedApi';

import {SubHeading} from '@components/AntdCustom';
import {Header} from '@components/Header';

import {Hosts} from './Hosts';
import {PathSettings} from './PathSettings';
import {RouteInfo} from './RouteInfo';

import * as S from './styled';

type RouteTabs = 'info' | 'settings' | 'hosts';

const StaticRouteDetails = () => {
  const navigate = useNavigate();
  const {name = '', namespace = '', ...params} = useParams();
  const section = params['*'];

  useGetStaticRouteCrdQuery({name, namespace});
  const selectedTab: RouteTabs = section?.includes('hosts')
    ? 'hosts'
    : section?.includes('settings')
    ? 'settings'
    : 'info';

  return (
    <S.Wrapper>
      <Header />
      <S.Container>
        <S.Content>
          <div>
            <S.Title>{name}</S.Title>
            <SubHeading>
              Define manually configured routing rules.&nbsp;
              <Typography.Link href="https://docs.kusk.io/reference/customresources/staticroute">
                Learn more
              </Typography.Link>
            </SubHeading>
          </div>
          <S.Grid>
            <S.List>
              <S.ListItem $selected={selectedTab === 'info'} onClick={() => navigate('info')}>
                Route info
              </S.ListItem>

              <S.ListItem $selected={selectedTab === 'settings'} onClick={() => navigate('settings')}>
                Route Target
              </S.ListItem>

              <S.ListItem $selected={selectedTab === 'hosts'} onClick={() => navigate('hosts')}>
                Hosts
              </S.ListItem>
            </S.List>

            <div>
              {selectedTab === 'info' && <RouteInfo />}
              {selectedTab === 'settings' && <PathSettings />}
              {selectedTab === 'hosts' && <Hosts />}
            </div>
          </S.Grid>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};
export default StaticRouteDetails;
