import {useState} from 'react';

import CRD from './CRD';
import KuskExtension from './KuskExtension';
import OpenApiEditor from './OpenApiEditor';

import * as S from './styled';

type OpenApiTabs = 'editor' | 'crd' | 'xkusk';

const ApiOpenSpec = () => {
  const [activeTab, setActiveTab] = useState<OpenApiTabs>('editor');
  return (
    <>
      <S.Header>
        <S.ApiDocsIcon $active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} />
        <S.CRDIcon $active={activeTab === 'crd'} onClick={() => setActiveTab('crd')} />
        <S.ExtensionIcon $active={activeTab === 'xkusk'} onClick={() => setActiveTab('xkusk')} />
      </S.Header>
      <>
        {activeTab === 'editor' && <OpenApiEditor />}
        {activeTab === 'crd' && <CRD />}
        {activeTab === 'xkusk' && <KuskExtension />}
      </>
    </>
  );
};
export default ApiOpenSpec;
