import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {Button, Form, Input, Modal} from 'antd';

import {AlertEnum} from '@models/alert';
import {useCreateStaticRoute} from '@models/api';

import {setAlert} from '@redux/reducers/alert';
import {closeStaticRouteModal} from '@redux/reducers/ui';

const AddStaticRouteModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isCreatingRoute, setIsCreatingRoute] = useState<boolean>(false);
  const {mutate: createStaticRoute} = useCreateStaticRoute({});
  const onSubmitHandler = async () => {
    try {
      const values = await form.validateFields();
      setIsCreatingRoute(true);
      await createStaticRoute(values);
      dispatch(
        setAlert({
          title: 'API deployed successfully',
          description: `${''} was deployed successfully in ${''} namespace!`,
          type: AlertEnum.Success,
        })
      );
    } catch (e) {
      setIsCreatingRoute(false);
      dispatch(
        setAlert({
          title: "couldn't create the static route",
          description: `Something went wrong!`,
          type: AlertEnum.Error,
        })
      );
    }
  };

  const onBackHandler = () => {
    dispatch(closeStaticRouteModal());
  };

  return (
    <Modal
      visible
      title="Create Static Route"
      onCancel={onBackHandler}
      footer={
        <>
          <Button type="text" onClick={onBackHandler}>
            Cancel
          </Button>

          <Button type="primary" disabled={isCreatingRoute} loading={isCreatingRoute} onClick={onSubmitHandler}>
            {isCreatingRoute ? 'Creating Route...' : 'Create'}
          </Button>
        </>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Route name"
          rules={[
            {
              required: true,
              message: 'type the name of the route',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddStaticRouteModal;
