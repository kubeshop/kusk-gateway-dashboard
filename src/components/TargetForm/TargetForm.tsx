import {useState} from 'react';

import {Typography} from 'antd';

import Redirect from './Targets/Redirect';
import Upstream from './Targets/Upstream';

import * as S from './styled';

const TargetForm = () => {
  const [targetSelection, setTargetSelection] = useState<string>('Upstream service');

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, marginBottom: 16}}>
        <Typography.Text>Type</Typography.Text>
        <S.Segmented
          value={targetSelection}
          options={['Upstream service', 'Upstream host', 'Redirect']}
          onChange={value => setTargetSelection(value.toString())}
        />
      </div>
      {targetSelection.startsWith('Upstream') ? (
        <Upstream reference={targetSelection === 'Upstream service' ? 'service' : 'host'} isRequiredFields />
      ) : (
        <Redirect isRequiredFields />
      )}
    </>
  );
};

export default TargetForm;
