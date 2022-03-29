import {EnvoyFleetsList} from '@components';

import * as S from './styled';

const EnvoyFleets: React.FC = () => {
  return (
    <S.EnvoyFleetsContainer>
      <EnvoyFleetsList />
    </S.EnvoyFleetsContainer>
  );
};

export default EnvoyFleets;
