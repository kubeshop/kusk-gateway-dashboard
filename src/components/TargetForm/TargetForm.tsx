import {useState} from 'react';

import {Button, Form, Typography} from 'antd';

import {TargetType} from '@models/ui';

import Redirect from './Targets/Redirect';
import Upstream from './Targets/Upstream';

interface IProps {
  targetTypes?: TargetType[];
}

const defaultTargetTypes: TargetType[] = ['service', 'host', 'redirect', 'mocked'];

const TargetForm = ({targetTypes = defaultTargetTypes}: IProps) => {
  const form = Form.useFormInstance();

  const [targetSelection, setTargetSelection] = useState<string>(
    form.getFieldValue('redirect')
      ? 'Redirect'
      : form.getFieldValue(['upstream', 'host'])
      ? 'Upstream host'
      : 'Upstream service'
  );

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, marginBottom: 16}}>
        <Typography.Text>Type</Typography.Text>
        <Button.Group>
          {targetTypes.includes('service') && (
            <Button
              type={targetSelection === 'Upstream service' ? 'primary' : undefined}
              onClick={() => setTargetSelection('Upstream service')}
            >
              Upstream service
            </Button>
          )}
          {targetTypes.includes('host') && (
            <Button
              type={targetSelection === 'Upstream host' ? 'primary' : undefined}
              onClick={() => setTargetSelection('Upstream host')}
            >
              Upstream host
            </Button>
          )}
          {targetTypes.includes('redirect') && (
            <Button
              type={targetSelection === 'Redirect' ? 'primary' : undefined}
              onClick={() => setTargetSelection('Redirect')}
            >
              Redirect
            </Button>
          )}
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
