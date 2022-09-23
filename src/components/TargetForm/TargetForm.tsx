import {useState} from 'react';

import {Button, Typography} from 'antd';

import Redirect from './Targets/Redirect';
import Upstream from './Targets/Upstream';

const TargetForm = () => {
  const [targetSelection, setTargetSelection] = useState<string>('Upstream service');

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, marginBottom: 16}}>
        <Typography.Text>Type</Typography.Text>
        <Button.Group>
          <Button
            type={targetSelection === 'Upstream service' ? 'primary' : undefined}
            onClick={() => setTargetSelection('Upstream service')}
          >
            Upstream service
          </Button>
          <Button
            type={targetSelection === 'Upstream host' ? 'primary' : undefined}
            onClick={() => setTargetSelection('Upstream host')}
          >
            Upstream host
          </Button>
          <Button
            type={targetSelection === 'Redirect' ? 'primary' : undefined}
            onClick={() => setTargetSelection('Redirect')}
          >
            Redirect
          </Button>
        </Button.Group>
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
