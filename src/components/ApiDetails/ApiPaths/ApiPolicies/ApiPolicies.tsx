import {PathNavigator} from '@components/PathNavigator';

import Policies from './Policies';

import * as S from './styled';

const ApiPolicies = () => {
  return (
    <S.Container>
      <PathNavigator />
      <div>
        <Policies />
      </div>
    </S.Container>
  );
};
export default ApiPolicies;
