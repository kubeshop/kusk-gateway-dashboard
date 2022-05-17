import {useEffect} from 'react';

import {Form, Switch} from 'antd';

interface IProps {
}

const Websocket: React.FC<IProps> = props => {
  const form = Form.useFormInstance();

  useEffect(() => {
    const websocket = undefined;

    if (!websocket) {
      return;
    }

    form.setFieldsValue({websocket});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form.Item label="Websocket" name="websocket" valuePropName="checked">
      <Switch />
    </Form.Item>
  );
};

export default Websocket;
