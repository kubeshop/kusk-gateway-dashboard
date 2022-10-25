import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {Form} from 'antd';

import _ from 'lodash';

import {updateApiSettings} from '@redux/reducers/main';

import {TargetForm} from '@components/TargetForm';

import * as S from './styled';

interface IProps {
  closeModal: () => void;
}

const AddTargetModal = ({closeModal}: IProps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onSubmitHandler = async () => {
    form.submit();
    const values = await form.validateFields();
    const editedOpenapi = _.merge({'x-kusk': values}, {'x-kusk': {mocking: {enabled: false}}});

    dispatch(updateApiSettings({editedOpenapi}));
    closeModal();
  };

  useEffect(() => {
    form.setFieldsValue({'x-kusk': {redirect: null, upstream: null}});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Modal
      open
      width="648px"
      title="Add a target"
      onCancel={closeModal}
      okText="Define target"
      onOk={onSubmitHandler}
      cancelButtonProps={{style: {display: 'none'}}}
    >
      <Form form={form} layout="vertical">
        <TargetForm />
      </Form>
    </S.Modal>
  );
};
export default AddTargetModal;
