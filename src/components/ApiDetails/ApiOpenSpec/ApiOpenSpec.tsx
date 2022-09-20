import {useNavigate, useParams} from 'react-router-dom';

import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';

import CRD from './CRD';
import KuskExtension from './KuskExtension';
import OpenApiEditor from './OpenApiEditor';

import * as S from './styled';

const ApiOpenSpec = () => {
  const navigate = useNavigate();
  const params = useParams();
  const section = params['*'];
  const activeTab = section?.includes('xkusk') ? 'xkusk' : section?.includes('crd') ? 'crd' : 'docs';

  return (
    <>
      <S.Header>
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="bottom" title="API Docs">
          <S.ApiDocsIcon $active={activeTab === 'docs'} onClick={() => navigate('docs')} />
        </Tooltip>
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="bottom" title="CRD">
          <S.CRDIcon $active={activeTab === 'crd'} onClick={() => navigate('crd')} />
        </Tooltip>
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="bottom" title="Kusk Extensions">
          <S.ExtensionIcon $active={activeTab === 'xkusk'} onClick={() => navigate('xkusk')} />
        </Tooltip>
      </S.Header>
      <>
        {activeTab === 'docs' && <OpenApiEditor />}
        {activeTab === 'crd' && <CRD />}
        {activeTab === 'xkusk' && <KuskExtension />}
      </>
    </>
  );
};
export default ApiOpenSpec;
