import {useState} from 'react';

import {useAppDispatch} from 'src/redux/hooks';
import {selectApi} from 'src/redux/reducers/main';

import * as S from './styled';

const ApiInfo: React.FC = () => {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<string>('api');

  const onCloseHandler = () => {
    dispatch(selectApi(''));
  };

  return (
    <S.ApiInfoContainer>
      <S.TabsContainer>
        <S.TabsLabel className={activeTab === 'api' ? 'selected-tab' : ''} onClick={() => setActiveTab('api')}>
          API
        </S.TabsLabel>
        <S.TabsLabel
          className={activeTab === 'request-log' ? 'selected-tab' : ''}
          onClick={() => setActiveTab('request-log')}
        >
          Request Log
        </S.TabsLabel>
      </S.TabsContainer>

      <S.CloseOutlined onClick={onCloseHandler} />
    </S.ApiInfoContainer>
  );
};

export default ApiInfo;
