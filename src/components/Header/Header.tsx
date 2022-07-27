import {Link, useLocation, useNavigate} from 'react-router-dom';

import {Menu, MenuProps} from 'antd';

import {DownOutlined} from '@ant-design/icons';

import {APP_ROUTES} from '@constants/constants';

import {useGetApisQuery} from '@redux/services/enhancedApi';

import KuskLogo from '@assets/KuskLogo.svg';

import * as S from './styled';

const Header = () => {
  const navigate = useNavigate();
  const {pathname: apiPath} = useLocation();
  const apiName = apiPath.split('/').pop();
  const {data: apis = []} = useGetApisQuery({});

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

  const apisMenu = <Menu items={apis.map(api => ({label: api.name, key: api.name}))} />;

  return (
    <S.Container>
      <Link to="/">
        <S.Logo id="sidebar-kusk-logo" src={KuskLogo} alt="Kusk" />
      </Link>
      <div style={{display: 'flex', marginLeft: 24, alignItems: 'center'}}>
        <S.Dropdown overlay={menu}>
          <span style={{minWidth: 78}}>
            <S.TeamLabel>K</S.TeamLabel>
            <DownOutlined />
          </span>
        </S.Dropdown>

        {apiName && APP_ROUTES.every(r => r !== apiName) && (
          <S.Dropdown overlay={apisMenu}>
            <span>
              <S.DropdownLabel>{apiName}</S.DropdownLabel>
              <DownOutlined />
            </span>
          </S.Dropdown>
        )}
      </div>
      <S.OptionsContainer>
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
      </S.OptionsContainer>
    </S.Container>
  );
};

export default Header;
