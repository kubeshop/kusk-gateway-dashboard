import {Dispatch, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Button, Form, Segmented, Typography} from 'antd';

import _ from 'lodash';

import {TargetType} from '@models/ui';

import {updateApiSettings} from '@redux/reducers/main';

import Redirect from './Redirect';
import Upstream from './Upstream';

import * as S from './styled';

interface IProps {
  target: any;
  type: TargetType;
  dismissEditMode: Dispatch<boolean>;
}

const EditTarget = ({target, type, dismissEditMode}: IProps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [targetSelection, setTargetSelection] = useState<string>(
    type === 'redirect' ? 'Redirect' : type === 'service' ? 'Upstream service' : 'Upstream host'
  );

  const onCancelClickHandler = () => {
    dismissEditMode(true);
  };

  const onChangeTargetType = (value: any) => {
    setTargetSelection(value.toString());
  };

  const onDeleteClickHandler = async () => {
    form.submit();
    const editedOpenapi = _.merge({}, {'x-kusk': {mocking: {enabled: true}, upstream: null, redirect: null}});
    dispatch(updateApiSettings({editedOpenapi}));
    dismissEditMode(true);
  };

  const onSaveClickHandler = async () => {
    form.submit();
    const values = await form.validateFields();
    let disableTargets = {};

    if (targetSelection === 'Upstream host') {
      disableTargets = {upstream: {service: null}, redirect: null};
    } else if (targetSelection === 'Upstream service') {
      disableTargets = {upstream: {host: null}, redirect: null};
    } else {
      disableTargets = {upstream: {host: null, service: null}};
    }

    const editedOpenapi = _.merge({...values}, {'x-kusk': {mocking: {enabled: false}, ...disableTargets}});

    dispatch(updateApiSettings({editedOpenapi}));
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
        <Button danger type="primary" size="large" onClick={onDeleteClickHandler}>
          Delete this target
        </Button>
        <div>
          <Button size="large" onClick={onCancelClickHandler}>
            Cancel
          </Button>
          <Button style={{marginLeft: 16}} type="primary" size="large" onClick={onSaveClickHandler}>
            Save
          </Button>
        </div>
      </S.CardActions>
    </S.Card>
  );
};

export default EditTarget;
