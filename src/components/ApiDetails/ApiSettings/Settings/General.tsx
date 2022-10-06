import {useDispatch} from 'react-redux';

import {Form, Input, Modal, Select, Switch} from 'antd';

import {AlertEnum} from '@models/alert';

import {useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {updateApiSettings} from '@redux/reducers/main';
import {useDeleteApiMutation, useGetApisQuery, useGetNamespacesQuery} from '@redux/services/enhancedApi';

import {CardHeading} from '@components/AntdCustom';
import {FormCard} from '@components/FormComponents';

import {checkDuplicateAPI} from '@utils/api';

import * as S from './styled';

const GeneralSettings = () => {
  const dispatch = useDispatch();
  const [deleteAPI] = useDeleteApiMutation();
  const selectedAPI = useAppSelector(state => state.main.selectedApi);
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];
  const {data: namespaces} = useGetNamespacesQuery();
  const {data: apis} = useGetApisQuery({namespace: selectedAPI?.namespace || ''});

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

  const onSaveClickHandler = (values: any) => {
    dispatch(updateApiSettings({editedOpenapi: values}));
  };

  return (
    <S.Container>
      <FormCard
        heading="Display name"
        subHeading="Please provide the display name of your API"
        formProps={{onFinish: onSaveClickHandler}}
      >
        <Form.Item
          name={['info', 'title']}
          initialValue={selectedAPIOpenSpec?.info?.title || selectedAPI?.name}
          rules={[
            {required: true, message: 'Enter API name'},
            {pattern: /^[a-z0-9]$|^([a-z0-9\-])*[a-z0-9]$/, message: 'Wrong pattern'},
            {max: 63, type: 'string', message: 'Name is too long'},
            () => {
              return {
                validator(_, value) {
                  const namespace = selectedAPI?.namespace;

                  if (namespace && checkDuplicateAPI(apis || [], `${namespace}-${value}`)) {
                    return Promise.reject(new Error(`API name is already used in ${namespace} namespace!`));
                  }

                  return Promise.resolve();
                },
              };
            },
          ]}
        >
          <Input placeholder="My first API being renamed" />
        </Form.Item>
        <S.Divider />
      </FormCard>

      <FormCard
        isViewMode
        heading="Namespace"
        subHeading="Define which namespace and labels this API is assigned to"
        helpTopic="Namespaces"
        helpLink="https://kubeshop.github.io/kusk-gateway/customresources/api/"
        formProps={{layout: 'vertical', onFinish: onSaveClickHandler, disabled: true}}
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
      </FormCard>

      <FormCard
        heading="API Prefix"
        subHeading="Define your prefix for every route on this API"
        helpTopic="API Prefixes"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#path"
        formProps={{onFinish: onSaveClickHandler}}
      >
        <Form.Item name={['x-kusk', 'path', 'prefix']} initialValue={xKusk?.path?.prefix}>
          <Input placeholder="/api/" />
        </Form.Item>
        <S.Divider />
      </FormCard>

      <FormCard
        heading="Request validation"
        subHeading="Validate all incoming requests against the corresponding OpenAPI definition."
        formProps={{onFinish: onSaveClickHandler}}
        cardProps={{
          extra: (
            <Form.Item
              name={['x-kusk', 'validation', 'request', 'enabled']}
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
        formProps={{name: 'websockets', onFinish: onSaveClickHandler}}
        cardProps={{
          extra: (
            <Form.Item name={['x-kusk', 'websocket']} valuePropName="checked" initialValue={xKusk?.websocket}>
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
        <S.DeleteButton danger type="primary" onClick={onDeleteClickHandler}>
          Delete
        </S.DeleteButton>
      </S.DeleteCard>
    </S.Container>
  );
};
export default GeneralSettings;
