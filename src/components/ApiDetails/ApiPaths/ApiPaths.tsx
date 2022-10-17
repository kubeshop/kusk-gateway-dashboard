import {ApiPathsTable} from './ApiPathsTable';
import {ApiPolicies} from './ApiPolicies';

import * as S from './styled';

const ApiPaths = () => {
  return (
    <S.Container>
      <S.Tabs>
        <S.Tabs.TabPane tab="Path Overview" key="1">
          <ApiPathsTable />
        </S.Tabs.TabPane>
        <S.Tabs.TabPane tab="Policies" key="2">
          <ApiPolicies />
        </S.Tabs.TabPane>
      </S.Tabs>
    </S.Container>
  );
};

export default ApiPaths;
