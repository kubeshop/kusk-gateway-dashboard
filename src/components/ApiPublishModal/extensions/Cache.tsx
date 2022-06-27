import {Form, InputNumber, Switch} from 'antd';

const Cache = () => {
  return (
    <>
      <Form.Item label="Enabled" name={['cache', 'enabled']} valuePropName="checked" initialValue={false}>
        <Switch />
      </Form.Item>
      <Form.Item label="Max age (in seconds)" name={['cache', 'max_age']} initialValue={60}>
        <InputNumber type="number" min={0} max={31536000} />
      </Form.Item>
    </>
  );
};

export default Cache;
