import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectEnvoyFleet} from '@redux/reducers/main';
import {setEnvoyFleetInfoActiveTab} from '@redux/reducers/ui';

import {InfoTabs} from '@components';

import * as S from './styled';

const TABS_ITEMS = [
  {key: 'crd', label: 'CRD'},
  {key: 'apis', label: 'APIs'},
  {key: 'static-routes', label: 'Static Routes'},
];

const EnvoyFleetInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.ui.envoyFleetInfoActiveTab);

  const onCloseHandler = () => {
    dispatch(selectEnvoyFleet(null));
    dispatch(setEnvoyFleetInfoActiveTab('crd'));
  };

  return (
    <S.EnvoyFleetInfoContainer>
      <InfoTabs activeTabKey={activeTab} tabs={TABS_ITEMS} setActiveTab={setEnvoyFleetInfoActiveTab} />

      <S.CloseOutlined onClick={onCloseHandler} />
    </S.EnvoyFleetInfoContainer>
  );
};

export default EnvoyFleetInfo;
