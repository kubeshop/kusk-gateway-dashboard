import {Form, Input, Switch} from 'antd';

const Cache = () => {
  return (
    <>
      <Form.Item label="Enabled" name={['cache', 'enabled']} valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Max Age" name={['cache', 'max_age']} initialValue={60}>
        <Input type="number" min={0} max={31536000} />
      </Form.Item>
    </>
  );
};

export default Cache;
