import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectEnvoyFleet} from '@redux/reducers/main';
import {setEnvoyFleetInfoActiveTab} from '@redux/reducers/ui';

import * as S from './styled';

const EnvoyFleetInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.ui.envoyFleetInfoActiveTab);

  const onCloseHandler = () => {
    dispatch(selectEnvoyFleet(null));
  };

  return (
    <S.EnvoyFleetInfoContainer>
      <S.TabsContainer>
        <S.TabsLabel
          className={activeTab === 'crd' ? 'selected-tab' : ''}
          onClick={() => dispatch(setEnvoyFleetInfoActiveTab('crd'))}
        >
          CRD
        </S.TabsLabel>

        <S.TabsLabel
          className={activeTab === 'apis' ? 'selected-tab' : ''}
          onClick={() => dispatch(setEnvoyFleetInfoActiveTab('apis'))}
        >
          APIs
        </S.TabsLabel>

        <S.TabsLabel
          className={activeTab === 'static-routes' ? 'selected-tab' : ''}
          onClick={() => dispatch(setEnvoyFleetInfoActiveTab('static-routes'))}
        >
          Static Routes
        </S.TabsLabel>
      </S.TabsContainer>

      <S.CloseOutlined onClick={onCloseHandler} />
    </S.EnvoyFleetInfoContainer>
  );
};

export default EnvoyFleetInfo;
