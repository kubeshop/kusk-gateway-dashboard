import {useDispatch} from 'react-redux';

import {Button, Form, Input, Radio, Select, Space, Steps} from 'antd';

import {InfoCircleOutlined} from '@ant-design/icons';

import {AlertEnum} from '@models/alert';
import {useCreateFleet, useGetNamespaces} from '@models/api';

import {setAlert} from '@redux/reducers/alert';
import {closeEnvoyFleetModalModal} from '@redux/reducers/ui';

import * as S from './styled';

const AddEnvoyFleetModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {data: namespaces} = useGetNamespaces({});
  const {mutate: createFleet, loading: isLoadingNewFleet} = useCreateFleet({});
  const onBackHandler = () => {
    dispatch(closeEnvoyFleetModalModal());
  };

  const onSubmitHandler = async () => {
    const formValues = await form.validateFields();
    form.submit();
    try {
      await createFleet(formValues);
      dispatch(
        setAlert({
          title: 'The Envoy fleet deployed successfully',
          description: `${formValues.name} was deployed successfully in ${formValues.namespace} namespace!`,
          type: AlertEnum.Success,
        })
      );
    } catch (e) {
      dispatch(
        setAlert({
          title: 'Failed to deploy the Envoy fleet',
          description: `Something went wrong!`,
          type: AlertEnum.Error,
        })
      );
    }
  };

  return (
    <S.Modal
      visible
      title="Publish New Envoy Fleet"
      width="900px"
      onCancel={onBackHandler}
      footer={
        <>
          <Button type="text" onClick={onBackHandler}>
            Cancel
          </Button>

          <Button type="primary" disabled={isLoadingNewFleet} onClick={onSubmitHandler}>
            {isLoadingNewFleet ? 'Publishing Fleet...' : 'Publish'}
          </Button>
        </>
      }
    >
      <S.Container>
        <S.StepsContainer>
          <Steps direction="vertical">
            <Steps.Step title="Envoy Fleet Info" icon={<InfoCircleOutlined />} />
          </Steps>
        </S.StepsContainer>

        <S.FormContainer>
          <Form layout="vertical" form={form}>
            <Form.Item name="name" label="Name" rules={[{required: true, message: 'Enter envoy fleet name!'}]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="namespace"
              label="Namespace"
              rules={[{required: true, message: 'Enter target namespace!'}]}
            >
              <Select>
                {namespaces?.map(namespace => (
                  <Select.Option value={namespace.name}>{namespace.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="serviceType"
              label="Service type"
              rules={[{required: true, message: 'Select service type!'}]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="LoadBalancer">LoadBalancer</Radio>
                  <Radio value="ClusterIP">ClusterIP</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
        </S.FormContainer>
      </S.Container>
    </S.Modal>
  );
};

export default AddEnvoyFleetModal;
