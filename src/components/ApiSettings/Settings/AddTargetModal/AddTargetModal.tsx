import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Form, Typography} from 'antd';

import _ from 'lodash';

import {updateApiSettings} from '@redux/reducers/main';

import Redirect from './Targets/Redirect';
import Upstream from './Targets/Upstream';

import * as S from './styled';

interface IProps {
  closeModal: () => void;
}

const AddTargetModal = ({closeModal}: IProps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [targetSelection, setTargetSelection] = useState<string>('Upstream service');

  const onSubmitHandler = async () => {
    form.submit();
    const values = await form.validateFields();
    const editedOpenapi = _.merge({...values}, {'x-kusk': {mocking: {enabled: false}}});

    dispatch(updateApiSettings({editedOpenapi}));
    closeModal();
  };

  useEffect(() => {
    form.setFieldsValue({'x-kusk': {redirect: null, upstream: null}});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Modal
      visible
      width="648px"
      title="Add a target"
      onCancel={closeModal}
      okText="Define target"
      onOk={onSubmitHandler}
      cancelButtonProps={{style: {display: 'none'}}}
    >
      <Form layout="vertical" form={form}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, marginBottom: 16}}>
          <Typography.Text>Type</Typography.Text>
          <S.Segmented
            value={targetSelection}
            options={['Upstream service', 'Upstream host', 'Redirect']}
            onChange={value => setTargetSelection(value.toString())}
          />
        </div>
        {targetSelection.startsWith('Upstream') ? (
          <Upstream reference={targetSelection === 'Upstream service' ? 'service' : 'host'} isRequiredFields={false} />
        ) : (
          <Redirect isRequiredFields={false} />
        )}
      </Form>
    </S.Modal>
  );
};
export default AddTargetModal;
