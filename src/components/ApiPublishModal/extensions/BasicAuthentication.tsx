import {Form, Input, InputNumber, Select, Switch} from 'antd';

const BasicAuthentication = () => {
  const form = Form.useFormInstance();
  const isAuthEnabled = Form.useWatch(['auth', 'enabled']);

  return (
    <>
      <Form.Item
        label="Enable"
        name={['auth', 'enabled']}
        valuePropName="checked"
        initialValue={Boolean(form.getFieldValue(['auth']))}
      >
        <Switch />
      </Form.Item>
      <Form.Item label="Authentication Scheme" name={['auth', 'scheme']} initialValue="basic">
        <Select disabled={!isAuthEnabled}>
          <Select.Option value="basic">Basic</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Path Prefix" name={['auth', 'path_prefix']}>
        <Input placeholder="e.g. /login" disabled={!isAuthEnabled} />
      </Form.Item>
      <Form.Item
        label="Hostname"
        name={['auth', 'auth-upstream', 'host', 'hostname']}
        rules={[
          {
            required: isAuthEnabled,
            message: 'Please enter hostname!',
          },
        ]}
      >
        <Input placeholder="e.g. example.com" disabled={!isAuthEnabled} />
      </Form.Item>
      <Form.Item
        label="Port"
        name={['auth', 'auth-upstream', 'host', 'port']}
        rules={[
          {
            required: isAuthEnabled,
            message: 'Please enter port!',
          },
        ]}
      >
        <InputNumber
          style={{minWidth: '100%'}}
          placeholder="Target port to which requests should be routed"
          type="number"
          disabled={!isAuthEnabled}
        />
      </Form.Item>
    </>
  );
};

export default BasicAuthentication;
