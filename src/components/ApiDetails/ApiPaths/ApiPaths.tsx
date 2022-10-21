import {useNavigate, useParams} from 'react-router-dom';

import {Typography} from 'antd';

import {ApiPathsTable} from './ApiPathsTable';
import {ApiPolicies} from './ApiPolicies';

import * as S from './styled';

const tabs = [
  {
    key: '1',
    label: 'Overview',
    children: <ApiPathsTable />,
  },
  {
    key: '2',
    label: 'Policies',
    children: <ApiPolicies />,
  },
];

const ApiPaths = () => {
  const navigate = useNavigate();
  const {'*': section} = useParams();
  const activeKey = section?.endsWith('policies') ? '2' : '1';
  const onTabClickHandler = (key: string) => {
    if (key === '1') {
      navigate('paths/overview');
    } else {
      navigate('paths/policies');
    }
  };
  return (
    <S.Container>
      <Typography.Title level={1}>Routes</Typography.Title>
      <S.Tabs items={tabs} activeKey={activeKey} onTabClick={onTabClickHandler} />
    </S.Container>
  );
};

export default ApiPaths;
