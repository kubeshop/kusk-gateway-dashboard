import {Form, InputNumber, Select, Switch} from 'antd';

const RateLimiting = () => {
  const form = Form.useFormInstance();
  return (
    <>
      <Form.Item
        label="Enable"
        name={['rateLimit', 'enabled']}
        valuePropName="checked"
        initialValue={Boolean(form.getFieldValue(['rateLimit']))}
      >
        <Switch />
      </Form.Item>
      <div style={{display: 'grid', gridTemplateColumns: '180px 180px'}}>
        <Form.Item label="Requests Per Unit" name={['rateLimit', 'requests_per_unit']} initialValue={1}>
          <InputNumber min="1" />
        </Form.Item>
        <Form.Item label="Time Unit" name={['rateLimit', 'unit']} initialValue="minute">
          <Select>
            <Select.Option value="second">Second</Select.Option>
            <Select.Option value="minute">Minute</Select.Option>
            <Select.Option value="hour">Hour</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item
        label="Per Connection"
        name={['rateLimit', 'per_connection']}
        valuePropName="checked"
        initialValue={false}
      >
        <Switch />
      </Form.Item>
      <Form.Item label="Response Code" name={['rateLimit', 'response_code']} initialValue={429}>
        <InputNumber />
      </Form.Item>
    </>
  );
};

export default RateLimiting;
