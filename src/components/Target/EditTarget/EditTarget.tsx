import {Dispatch, useState} from 'react';

import {Button, Form, Segmented, Typography} from 'antd';

import {TargetType} from '@models/ui';

import Redirect from './Redirect';
import Upstream from './Upstream';

import * as S from './styled';

interface IProps {
  target: any;
  type: TargetType;
  dismissEditMode: Dispatch<boolean>;
  onDelete: () => void;
  onSave: () => void;
}

const EditTarget = ({target, type, dismissEditMode, onDelete, onSave}: IProps) => {
  const [form] = Form.useForm();
  const [targetSelection, setTargetSelection] = useState<string>(
    type === 'redirect' ? 'Redirect' : type === 'service' ? 'Upstream service' : 'Upstream host'
  );

  const onChangeTargetType = (value: any) => {
    setTargetSelection(value.toString());
  };

  const onCancelClickHandler = () => {
    dismissEditMode(true);
  };

  return (
    <S.Card>
      <Form layout="vertical" form={form}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, marginBottom: 16}}>
          <Typography.Text>Type</Typography.Text>
          <Segmented
            value={targetSelection}
            options={['Upstream service', 'Upstream host', 'Redirect']}
            onChange={onChangeTargetType}
          />
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
        <Button danger type="primary" size="large" onClick={onDelete}>
          Delete this target
        </Button>
        <div>
          <Button size="large" onClick={onCancelClickHandler}>
            Cancel
          </Button>
          <Button style={{marginLeft: 16}} type="primary" size="large" onClick={onSave}>
            Save
          </Button>
        </div>
      </S.CardActions>
    </S.Card>
  );
};

export default EditTarget;
