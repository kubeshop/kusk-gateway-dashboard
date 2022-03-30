import {useAppDispatch} from '@redux/hooks';
import {selectEnvoyFleet} from '@redux/reducers/main';

import * as S from './styled';

const EnvoyFleetInfo: React.FC = () => {
  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    dispatch(selectEnvoyFleet(null));
  };

  return (
    <S.EnvoyFleetInfoContainer>
      <S.CloseOutlined onClick={onCloseHandler} />
    </S.EnvoyFleetInfoContainer>
  );
};

export default EnvoyFleetInfo;
