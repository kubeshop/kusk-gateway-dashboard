import {useState} from 'react';
import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';

import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';

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
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="bottom" title="Open API Spec & Playground">
          <S.FileTextOutlinedIcon $active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} />
        </Tooltip>
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="bottom" title="CRD">
          <S.CRDIcon $active={activeTab === 'crd'} onClick={() => setActiveTab('crd')} />
        </Tooltip>
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="bottom" title="Kusk Extensions">
          <S.ExtensionIcon $active={activeTab === 'xkusk'} onClick={() => setActiveTab('xkusk')} />
        </Tooltip>
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
