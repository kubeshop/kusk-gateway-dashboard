import {useState} from 'react';

import * as S from './styled';

const ApiInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('api');

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
    </S.ApiInfoContainer>
  );
};

export default ApiInfo;
