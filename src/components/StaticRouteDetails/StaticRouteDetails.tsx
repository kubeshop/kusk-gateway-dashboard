import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectStaticRoutePath} from '@redux/reducers/main';
import {useGetStaticRouteCrdQuery} from '@redux/services/enhancedApi';

import {SubHeading} from '@components/AntdCustom';
import {Header} from '@components/Header';

import useOnClickOutside from '@hooks/useOnClickOutside';

import {Hosts} from './Hosts';
import {PathSettings} from './PathSettings';
import {Paths} from './Paths';
import {RouteInfo} from './RouteInfo';

import * as S from './styled';

type RouteTabs = 'info' | 'paths' | 'hosts';

const StaticRouteDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {name = '', namespace = '', ...params} = useParams();
  const section = params['*'];
  const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);

  const {data: crd, isLoading} = useGetStaticRouteCrdQuery({name, namespace});
  const ref = useRef(null);
  const selectedTab: RouteTabs = section?.includes('hosts') ? 'hosts' : section?.includes('paths') ? 'paths' : 'info';
  useOnClickOutside(ref, () => dispatch(selectStaticRoutePath(null)));

  useEffect(() => {
    if (selectedTab !== 'paths') {
      dispatch(selectStaticRoutePath(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  return isLoading ? null : (
    <S.Wrapper>
      <Header />
      <S.Container>
        <S.Content onClick={() => dispatch(selectStaticRoutePath(null))}>
          <div>
            {/* <Typography.Link onClick={() => navigate('/settings/staticRoutes')}>
              <S.ArrowLeftOutlinedIcon />
              Back to Static Routes
            </Typography.Link> */}

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
              <S.ListItem $selected={selectedTab === 'info'} onClick={() => navigate('info')}>
                Route info
              </S.ListItem>

              <S.ListItem $selected={selectedTab === 'paths'} onClick={() => navigate('paths')}>
                Paths
              </S.ListItem>

              <S.ListItem $selected={selectedTab === 'hosts'} onClick={() => navigate('hosts')}>
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
    </S.Wrapper>
  );
};
export default StaticRouteDetails;
