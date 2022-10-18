import {Form, Input, InputNumber, Select, Switch} from 'antd';

import {useAppSelector} from '@redux/hooks';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

interface IProps {
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const Authentication = ({onFinish, onCancel}: IProps) => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];

  return (
    <FormCard
      enableCancelButton
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
      formProps={{layout: 'vertical', onFinish}}
      cancelEditMode={onCancel}
    >
      <Form.Item label="Authentication Scheme" name={['x-kusk', 'auth', 'scheme']} initialValue={xKusk?.auth?.scheme}>
        <Select>
          <Select.Option value="basic">Basic</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Path Prefix" name={['x-kusk', 'auth', 'path_prefix']} initialValue={xKusk?.auth?.path_prefix}>
        <Input placeholder="e.g. /login" />
      </Form.Item>

      <S.Row>
        <S.CardItem style={{flex: 1}}>
          <Form.Item
            label="Hostname"
            name={['auth', 'auth-upstream', 'host', 'hostname']}
            initialValue={xKusk?.auth && xKusk?.auth['auth-upstream'] && xKusk?.auth['auth-upstream'].host.hostname}
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
          name={['auth', 'auth-upstream', 'host', 'port']}
          initialValue={xKusk?.auth && xKusk?.auth['auth-upstream'] && xKusk?.auth['auth-upstream'].host.port}
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
