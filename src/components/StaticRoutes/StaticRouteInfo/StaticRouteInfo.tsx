import {useAppDispatch} from '@redux/hooks';
import {selectStaticRoute} from '@redux/reducers/main';

import * as S from './styled';

const StaticRouteInfo: React.FC = () => {
  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    dispatch(selectStaticRoute(null));
  };

  return (
    <S.StaticRouteInfoContainer>
      StaticRouteInfo <S.CloseOutlined onClick={onCloseHandler} />
    </S.StaticRouteInfoContainer>
  );
};

export default StaticRouteInfo;
