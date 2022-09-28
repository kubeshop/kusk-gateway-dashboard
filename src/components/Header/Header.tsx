import {useDispatch} from 'react-redux';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import {Button, Dropdown, Menu} from 'antd';

import {DownOutlined} from '@ant-design/icons';

import {skipToken} from '@reduxjs/toolkit/query/react';

import {AppRoutes} from '@constants/AppRoutes';

import {AlertEnum} from '@models/alert';

import {setAlert} from '@redux/reducers/alert';
import {selectApi} from '@redux/reducers/main';
import {useGetApisQuery} from '@redux/services/enhancedApi';

import * as S from './styled';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {namespace: apiNamespace, name: apiName} = useParams();
  const type = pathname.includes(AppRoutes.API) ? 'api' : 'staticroute';

  const backOptions = pathname.includes(AppRoutes.API)
    ? {label: 'APIs', onClick: () => navigate(AppRoutes.APIS)}
    : {label: 'Static Routes', onClick: () => navigate(AppRoutes.STATIC_ROUTES)};

  const {data: apis = []} = useGetApisQuery(type === 'api' ? {} : skipToken);

  const apisMenu = apis
    .slice()
    .sort(a => (a.name === apiName && a.namespace === apiNamespace ? -1 : 0))
    .map(api => ({
      label: api.name,
      key: `${api.namespace}-${api.name}`,
      onClick: () => {
        dispatch(selectApi(api));
        dispatch(
          setAlert({
            title: 'API selected',
            description: `${api.name} is selected`,
            type: AlertEnum.Success,
          })
        );
        navigate(`${AppRoutes.API}/${api.namespace}/${api.name}`);
      },
    }));

  const helpMenu = () => (
    <Menu
      items={[
        {
          label: 'Release Notes',
          key: '1',
          onClick: () => {
            window.open('https://kubeshop.io/blog-projects/kusk', '_blank');
          },
        },
        {
          label: 'Documentation',
          key: '2',
          onClick: () => {
            window.open('https://docs.kusk.io/', '_blank');
          },
        },
        {
          label: 'Discord',
          key: '3',
          onClick: () => {
            window.open('https://discord.com/channels/884464549347074049/913784299273211905', '_blank');
          },
        },
        {
          label: 'Privacy Policy',
          key: '4',
          onClick: () => {
            window.open('https://docs.kusk.io/privacy', '_blank');
          },
        },
      ]}
    />
  );

  return (
    <S.Container>
      <Button type="text" icon={<S.ArrowLeftOutlinedIcon />} onClick={backOptions.onClick}>
        {backOptions.label}
      </Button>
      {type === 'api' && (
        <S.Options>
          <S.Dropdown overlay={<Menu items={apisMenu} selectedKeys={[`${apiNamespace}-${apiName}`]} />}>
            <S.DropdownContainer>
              <S.DropdownLabel>{apiName}</S.DropdownLabel>
              <DownOutlined />
            </S.DropdownContainer>
          </S.Dropdown>
        </S.Options>
      )}

      <S.RightContent>
        <S.IconContainer>
          <a href="https://github.com/kubeshop/kusk-gateway" target="_blank" rel="noopener noreferrer">
            <S.GithubFilled />
          </a>
        </S.IconContainer>
        <Dropdown arrow overlay={helpMenu}>
          <S.IconContainer>
            <S.QuestionCircleFilled />
          </S.IconContainer>
        </Dropdown>
      </S.RightContent>
    </S.Container>
  );
};

export default Header;
