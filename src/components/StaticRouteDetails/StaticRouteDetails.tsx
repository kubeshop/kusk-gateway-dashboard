import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';

import {Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectStaticRoutePath, selectStaticRouteSpec} from '@redux/reducers/main';
import {useGetStaticRouteCrdQuery} from '@redux/services/enhancedApi';

import {SubHeading} from '@components/AntdCustom';

import {Hosts} from './Hosts';
import {PathSettings} from './PathSettings';
import {Paths} from './Paths';
import {RouteInfo} from './RouteInfo';

import * as S from './styled';

type RouteTabs = 'info' | 'paths' | 'hosts';

const StaticRouteDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [name, namespace] = pathname.split('/').reverse();
  const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);

  const {data: crd} = useGetStaticRouteCrdQuery({name, namespace});
  const [selectedTab, setSelectedTab] = useState<RouteTabs>('info');

  useEffect(() => {
    dispatch(selectStaticRouteSpec(crd));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crd]);

  useEffect(() => {
    if (selectedTab !== 'paths') {
      dispatch(selectStaticRoutePath(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  return (
    <S.Container>
      <S.Content>
        <div>
          <Typography.Link onClick={() => navigate(-1)}>
            <S.ArrowLeftOutlinedIcon />
            Back to Static Routes
          </Typography.Link>

          <S.Title>{(crd as any)?.metadata?.name}</S.Title>
          <SubHeading>
            Define manually configured routing rules.&nbsp;
            <Typography.Link href="https://docs.kusk.io/reference/customresources/staticroute">
              Learn more
            </Typography.Link>
          </SubHeading>
        </div>
        <S.Grid>
          <S.List>
            <S.ListItem $selected={selectedTab === 'info'} onClick={() => setSelectedTab('info')}>
              Route info
            </S.ListItem>

            <S.ListItem $selected={selectedTab === 'paths'} onClick={() => setSelectedTab('paths')}>
              Paths
            </S.ListItem>

            <S.ListItem $selected={selectedTab === 'hosts'} onClick={() => setSelectedTab('hosts')}>
              Hosts
            </S.ListItem>
          </S.List>

          <div>
            {selectedTab === 'info' && <RouteInfo />}
            {selectedTab === 'paths' && <Paths />}
            {selectedTab === 'hosts' && <Hosts />}
          </div>
        </S.Grid>
      </S.Content>

      {Boolean(selectedRoutePath) && (
        <S.PathSettingsContainer>
          <PathSettings />
        </S.PathSettingsContainer>
      )}
    </S.Container>
  );
};
export default StaticRouteDetails;
