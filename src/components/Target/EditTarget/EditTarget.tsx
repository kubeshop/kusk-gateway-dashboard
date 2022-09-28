import {Dispatch, useEffect, useState} from 'react';

import {Button, Form, Typography} from 'antd';

import {TargetType} from '@models/ui';

import Redirect from './Redirect';
import Upstream from './Upstream';

import * as S from './styled';

interface IProps {
  target: any;
  type: TargetType;
  dismissEditMode: Dispatch<boolean>;
  onDelete?: () => void;
  onSave: (values: any) => void;
}

const EditTarget = ({target, type, dismissEditMode, onDelete, onSave}: IProps) => {
  const [form] = Form.useForm();
  const [targetSelection, setTargetSelection] = useState<string>(
    type === 'redirect' ? 'Redirect' : type === 'service' ? 'Upstream service' : 'Upstream host'
  );

  const onCancelClickHandler = () => {
    dismissEditMode(true);
  };

  const onSaveClickHandler = () => {
    form.submit();
    onSave(form.getFieldsValue(true));
    form.resetFields();
    dismissEditMode(true);
  };

  useEffect(() => {
    if (targetSelection === 'Redirect') {
      form.setFieldsValue({upstream: null});
    } else if (targetSelection === 'Upstream service') {
      form.setFieldsValue({
        redirect: null,
        upstream: {
          host: null,
        },
      });
    } else {
      form.setFieldsValue({
        redirect: null,
        upstream: {
          service: null,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetSelection]);

  return (
    <S.Card>
      <Form layout="vertical" form={form}>
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
          <Upstream
            reference={targetSelection === 'Upstream service' ? 'service' : 'host'}
            isRequiredFields={false}
            target={target}
          />
        ) : (
          <Redirect isRequiredFields={false} target={target} />
        )}
      </Form>
      <S.CardActions>
        {onDelete && (
          <Button danger type="primary" onClick={onDelete}>
            Delete this target
          </Button>
        )}
        <div style={{marginLeft: 'auto'}}>
          <Button onClick={onCancelClickHandler}>Cancel</Button>
          <Button style={{marginLeft: 16}} type="primary" onClick={onSaveClickHandler}>
            Save
          </Button>
        </div>
      </S.CardActions>
    </S.Card>
  );
};

export default EditTarget;
