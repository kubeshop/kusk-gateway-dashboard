import {useState} from 'react';

import CRD from './CRD';

import * as S from './styled';

type OpenApiTabs = 'editor' | 'crd' | 'playground';

const ApiOpenSpec = () => {
  const [activeTab, setActiveTab] = useState<OpenApiTabs>('editor');
  return (
    <>
      <S.Header>
        <S.FileTextOutlinedIcon $active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} />
        <S.CRDIcon $active={activeTab === 'crd'} onClick={() => setActiveTab('crd')} />
        <S.ApiOutlinedIcon $active={activeTab === 'playground'} onClick={() => setActiveTab('playground')} />
      </S.Header>
      <div>{activeTab === 'crd' && <CRD />}</div>
    </>
  );
};
export default ApiOpenSpec;
