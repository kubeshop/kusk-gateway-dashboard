import {ApiPathsTable} from './ApiPathsTable';
import {ApiPolicies} from './ApiPolicies';

import * as S from './styled';

const tabs = [
  {
    key: '1',
    label: 'Path Overview',
    children: <ApiPathsTable />,
  },
  {
    key: '2',
    label: 'Policies',
    children: <ApiPolicies />,
  },
];

const ApiPaths = () => {
  return (
    <S.Container>
      <S.Tabs items={tabs} />
    </S.Container>
  );
};

export default ApiPaths;
