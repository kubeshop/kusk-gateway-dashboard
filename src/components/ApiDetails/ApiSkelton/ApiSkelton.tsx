import {CardSkeleton} from '@components/Skeletons';

import * as S from './styled';

const ApiSkelton = () => {
  return (
    <S.Container>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </S.Container>
  );
};
export default ApiSkelton;
