import {Link, useNavigate, useParams} from 'react-router-dom';

import {Dropdown, Menu} from 'antd';

import KuskLogo from '@assets/KuskLogo.svg';

import * as S from './styled';

const Header = () => {
  const navigate = useNavigate();
  const {'*': path = ''} = useParams();
  const [section] = path.length > 0 ? path?.split('/') : ['apis'];

  const resourceMenu = [
    {
      label: 'APIs',
      key: 'apis',
      onClick: () => {
        navigate('/apis');
      },
    },
    {
      label: 'Static Routes',
      key: 'staticroutes',
      onClick: () => {
        navigate('/staticroutes');
      },
    },
    {
      label: 'Settings',
      key: 'settings',
      onClick: () => {
        navigate('/settings');
      },
    },
  ];

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

      <S.NavMenu mode="horizontal" items={resourceMenu} selectedKeys={[section]} />

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
