import {useDispatch} from 'react-redux';

import {Form, Input, InputNumber, Select, Switch} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {updateApiSettings} from '@redux/reducers/main';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

const Authentication = () => {
  const [form] = Form.useForm();
  const authSchema = Form.useWatch(['x-kusk', 'auth', 'scheme'], form);
  const dispatch = useDispatch();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];

  const onSaveClickHandler = (values: any) => {
    const {enabled, ...rest} = values;
    if (enabled) {
      delete rest['x-kusk'].auth.scheme;
      dispatch(updateApiSettings({editedOpenapi: rest}));
    } else {
      dispatch(updateApiSettings({editedOpenapi: {'x-kusk': {auth: null}}}));
    }
  };
  return (
    <FormCard
      heading="Authentication"
      subHeading="Configure HTTP Authentication for your API"
      helpTopic="Authentication"
      helpLink="https://docs.kusk.io/extension#authentication"
      cardProps={{
        extra: (
          <Form.Item label="Enable" name={['enabled']} valuePropName="checked" initialValue={Boolean(xKusk?.auth)}>
            <Switch />
          </Form.Item>
        ),
      }}
      formProps={{layout: 'vertical', onFinish: onSaveClickHandler, form}}
    >
      <Form.Item
        label="Authentication Scheme"
        name={['x-kusk', 'auth', 'scheme']}
        initialValue={Object.keys(xKusk?.auth || [])[0]}
      >
        <Select>
          <Select.Option value="custom">Custom</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Path Prefix"
        name={['x-kusk', 'auth', authSchema, 'path_prefix']}
        initialValue={xKusk?.auth?.custom?.path_prefix}
      >
        <Input placeholder="e.g. /login" />
      </Form.Item>

      <S.Row>
        <S.CardItem style={{flex: 1}}>
          <Form.Item
            label="Hostname"
            name={['x-kusk', 'auth', authSchema, 'host', 'hostname']}
            initialValue={xKusk?.auth.custom?.host?.hostname}
            rules={[
              {
                required: true,
                message: 'Please enter hostname',
              },
            ]}
          >
            <Input placeholder="e.g. example.com" />
          </Form.Item>
        </S.CardItem>
        <Form.Item
          label="Port"
          name={['x-kusk', 'auth', authSchema, 'host', 'port']}
          initialValue={xKusk?.auth?.custom?.host?.port}
          rules={[
            {
              required: true,
              message: 'Please enter port',
            },
          ]}
        >
          <InputNumber
            style={{minWidth: '100%'}}
            placeholder="Target port to which requests should be routed"
            type="number"
          />
        </Form.Item>
      </S.Row>

      <S.Divider />
    </FormCard>
  );
};

export default Authentication;
