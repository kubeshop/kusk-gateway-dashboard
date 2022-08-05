import {useDispatch} from 'react-redux';

import {Form, Input, Modal, Select, Switch, Typography} from 'antd';

import {AlertEnum} from '@models/alert';

import {useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {useDeleteApiMutation, useGetNamespacesQuery} from '@redux/services/enhancedApi';

import {CardHeading} from '@components/AntdCustom';
import {FormCard} from '@components/FormCard';

import * as S from './styled';

const GeneralSettings = () => {
  const dispatch = useDispatch();
  const [deleteAPI] = useDeleteApiMutation();
  const selectedAPI = useAppSelector(state => state.main.selectedApi);
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec['x-kusk'];
  const {data: namespaces} = useGetNamespacesQuery();

  const onDeleteClickHandler = () => {
    Modal.confirm({
      title: `Delete API ${selectedAPI?.name}`,
      content: `Are you sure you want to delete API ${selectedAPI?.name}?`,
      okText: 'Yes, delete',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: async () => {
        if (selectedAPI) {
          try {
            await deleteAPI({namespace: selectedAPI?.namespace, name: selectedAPI.name}).unwrap();
            dispatch(
              setAlert({
                title: 'API deleted successfully',
                description: `${selectedAPI.name} was deleted successfully in ${selectedAPI.namespace} namespace!`,
                type: AlertEnum.Success,
              })
            );
          } catch (e) {
            dispatch(
              setAlert({
                title: 'Deleting API was failed',
                description: `Something went wrong!`,
                type: AlertEnum.Error,
              })
            );
          }
        }
      },
    });
  };

  return (
    <S.Container>
      <FormCard heading="Display name" subHeading="Please provide the display name of your API">
        <Form.Item name="name" initialValue={selectedAPI?.name}>
          <Input placeholder="My first API being renamed" />
        </Form.Item>
        <S.Divider />
      </FormCard>

      <FormCard
        heading="Namespace & Labels"
        subHeading="Define which namespace and labels this API is assigned to"
        helpTopic="Namespaces & Labels"
        helpLink="https://kubeshop.github.io/kusk-gateway/customresources/api/"
        formProps={{layout: 'vertical'}}
      >
        <Form.Item label="Namespace" name="namespace" initialValue={selectedAPI?.namespace}>
          <Select placeholder="namespace">
            {namespaces?.map(el => (
              <Select.Option key={el.name} value={el.name}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <S.CardItem>
            <Typography.Text type="secondary">Labels</Typography.Text>
            <Select placeholder="label" />
          </S.CardItem>
        </Form.Item>
        <S.Divider />
      </FormCard>

      <FormCard
        heading="API Prefix"
        subHeading="Define your prefix for every route on this API"
        helpTopic="API Prefixes"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#path"
      >
        <Form.Item name={['prefix']} initialValue={xKusk?.prefix}>
          <Input placeholder="/api/" />
        </Form.Item>
        <S.Divider />
      </FormCard>

      <FormCard
        heading="Request validation"
        subHeading="Validate all incoming requests against the corresponding OpenAPI definition."
        cardProps={{
          extra: (
            <Form.Item
              name={['validation', 'enabled']}
              valuePropName="checked"
              initialValue={xKusk?.validation?.request?.enabled}
            >
              <Switch />
            </Form.Item>
          ),
        }}
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#validation"
        helpTopic="Request validation"
      />

      <FormCard
        heading="Websocket"
        subHeading='Handle "Upgrade: websocket" and other actions related to Websocket HTTP headers.'
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#websocket"
        helpTopic="Websockets"
        formProps={{name: 'websockets'}}
        cardProps={{
          extra: (
            <Form.Item name="websocket" valuePropName="checked" initialValue={xKusk?.websocket}>
              <Switch />
            </Form.Item>
          ),
        }}
      />

      <S.DeleteCard
        title={
          <CardHeading
            heading="Delete this API"
            subHeading="The API will be permanently deleted, including its deployments and all of its history. This action is irreversible and can not be undone."
          />
        }
      >
        <S.DeleteButton danger size="large" type="primary" onClick={onDeleteClickHandler}>
          Delete
        </S.DeleteButton>
      </S.DeleteCard>
    </S.Container>
  );
};
export default GeneralSettings;
