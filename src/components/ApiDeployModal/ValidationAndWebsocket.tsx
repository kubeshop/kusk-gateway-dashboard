import {useEffect} from 'react';

import {Form, FormInstance, Switch} from 'antd';

interface IProps {
  form: FormInstance<any>;
  openApiSpec: {[key: string]: any};
}

const ValidationAndWebsocket: React.FC<IProps> = props => {
  const {form, openApiSpec} = props;

  useEffect(() => {
    const validation = openApiSpec['x-kusk'].validation;
    const websocket = openApiSpec['x-kusk'].websocket;

    if (!validation && !websocket) {
      return;
    }

    form.setFieldsValue({validation, websocket});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openApiSpec]);

  return (
    <>
      <Form.Item label="Request validation" name={['validation', 'request', 'enabled']} valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="Websocket" name="websocket" valuePropName="checked">
        <Switch />
      </Form.Item>
    </>
  );
};

export default ValidationAndWebsocket;
