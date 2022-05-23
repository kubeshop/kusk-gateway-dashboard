import {Form, Switch} from 'antd';

interface IProps {}

const Websocket: React.FC<IProps> = props => {
  return (
    <Form.Item label="Websocket" name={['websocket', 'websocket']} valuePropName="checked">
      <Switch />
    </Form.Item>
  );
};

export default Websocket;
