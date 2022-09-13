import {useDispatch} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';

import {Dropdown, Menu, MenuProps} from 'antd';

import {DownOutlined} from '@ant-design/icons';

import {skipToken} from '@reduxjs/toolkit/query/react';

import {APP_ROUTES} from '@constants/constants';

import {AlertEnum} from '@models/alert';

import {setAlert} from '@redux/reducers/alert';
import {selectApi} from '@redux/reducers/main';
import {useGetApisQuery} from '@redux/services/enhancedApi';

import KuskLogo from '@assets/KuskLogo.svg';

import * as S from './styled';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname: apiPath} = useLocation();
  const apiName = apiPath.split('/').pop();
  const isApiRoute = apiName && APP_ROUTES.every(r => !apiPath.includes(r));
  const {data: apis = []} = useGetApisQuery(isApiRoute ? {} : skipToken);

  const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === 'settings') {
      navigate('/settings/kusk');
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: (
            <span style={{minWidth: 78}}>
              <S.TeamLabel>K</S.TeamLabel> kusk
            </span>
          ),
          key: '1',
        },
        {
          label: 'Settings',
          key: 'settings',
        },
      ]}
    />
  );

  const apisMenu = (
    <Menu
      items={apis.map(api => ({
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
          navigate(`/${api.namespace}/${api.name}`);
        },
      }))}
    />
  );

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
      <Link to="/">
        <S.Logo id="sidebar-kusk-logo" src={KuskLogo} alt="Kusk" />
      </Link>
      <S.Options>
        <S.Divider />
        <S.Dropdown overlay={menu}>
          <S.DropdownContainer style={{minWidth: 78}}>
            <S.TeamLabel>K</S.TeamLabel>
            <DownOutlined />
          </S.DropdownContainer>
        </S.Dropdown>
        <S.Divider />
        {isApiRoute && (
          <S.Dropdown overlay={apisMenu}>
            <S.DropdownContainer>
              <S.DropdownLabel>{apiName}</S.DropdownLabel>
              <DownOutlined />
            </S.DropdownContainer>
          </S.Dropdown>
        )}
      </S.Options>

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
