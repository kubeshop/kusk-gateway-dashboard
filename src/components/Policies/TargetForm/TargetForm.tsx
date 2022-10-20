import {useEffect, useState} from 'react';

import {Button, Form, Typography} from 'antd';

import Mocking from './Targets/Mocking';
import Redirect from './Targets/Redirect';
import Upstream from './Targets/Upstream';

const TargetForm = () => {
  const form = Form.useFormInstance();

  const [targetSelection, setTargetSelection] = useState<string>(
    form.getFieldValue('mocking')
      ? 'Mocking'
      : form.getFieldValue('redirect')
      ? 'Redirect'
      : form.getFieldValue(['upstream', 'host'])
      ? 'Upstream host'
      : 'Upstream service'
  );

  useEffect(() => {
    if (targetSelection === 'Mocking') {
      form.setFieldsValue({
        'x-kusk': {
          upstream: null,
          redirect: null,
          mocking: {
            enabled: true,
          },
        },
      });
    }
    if (targetSelection === 'Redirect') {
      form.setFieldsValue({
        'x-kusk': {
          upstream: null,
          mocking: null,
        },
      });
    }

    if (targetSelection === 'Upstream host') {
      form.setFieldsValue({
        'x-kusk': {
          upstream: {service: null},
          mocking: null,
          redirect: null,
        },
      });
    }
    if (targetSelection === 'Upstream service') {
      form.setFieldsValue({
        'x-kusk': {
          upstream: {host: null},
          mocking: null,
          redirect: null,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetSelection]);

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
          <Button
            type={targetSelection === 'Mocking' ? 'primary' : undefined}
            onClick={() => setTargetSelection('Mocking')}
          >
            Mock
          </Button>
        </Button.Group>
      </div>
      {targetSelection.startsWith('Upstream') && (
        <Upstream reference={targetSelection === 'Upstream service' ? 'service' : 'host'} isRequiredFields />
      )}
      {targetSelection.startsWith('Redirect') && <Redirect isRequiredFields />}
      {targetSelection === 'Mocking' && <Mocking />}
    </>
  );
};

export default TargetForm;
