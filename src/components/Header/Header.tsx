import {useDispatch} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';

import {Menu, MenuProps} from 'antd';

import {DownOutlined} from '@ant-design/icons';

import {skipToken} from '@reduxjs/toolkit/query/react';

import {APP_ROUTES} from '@constants/constants';

import {selectApi} from '@redux/reducers/main';
import {useGetApisQuery} from '@redux/services/enhancedApi';

import KuskLogo from '@assets/KuskLogo.svg';

import * as S from './styled';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname: apiPath} = useLocation();
  const apiName = apiPath.split('/').pop();
  const isApiRoute = apiName && APP_ROUTES.every(r => r !== apiName);
  const {data: apis = []} = useGetApisQuery(isApiRoute ? {} : skipToken);

  const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === 'settings') {
      navigate('/settings');
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
        },
      }))}
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
          <span style={{minWidth: 78, marginLeft: 16}}>
            <S.TeamLabel>K</S.TeamLabel>
            <DownOutlined />
          </span>
        </S.Dropdown>
        <S.Divider />
        {isApiRoute && (
          <S.Dropdown overlay={apisMenu}>
            <span>
              <S.DropdownLabel>{apiName}</S.DropdownLabel>
              <DownOutlined />
            </span>
          </S.Dropdown>
        )}
      </S.Options>

      <S.RightContent>
        <S.IconContainer>
          <a href="https://github.com/kubeshop/kusk-gateway" target="_blank" rel="noopener noreferrer">
            <S.GithubFilled />
          </a>
        </S.IconContainer>

        <S.IconContainer>
          <a href="https://kubeshop.github.io/kusk-gateway/" target="_blank" rel="noopener noreferrer">
            <S.QuestionCircleFilled />
          </a>
        </S.IconContainer>
      </S.RightContent>
    </S.Container>
  );
};

export default Header;
