import {useEffect} from 'react';

import {Form, FormInstance, Switch} from 'antd';

interface IProps {
  form: FormInstance<any>;
  openApiSpec: {[key: string]: any};
}

const Websocket: React.FC<IProps> = props => {
  const {form, openApiSpec} = props;

  useEffect(() => {
    const websocket = openApiSpec['x-kusk'].websocket;

    if (!websocket) {
      return;
    }

    form.setFieldsValue({websocket});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openApiSpec]);

  return (
    <Form.Item label="Websocket" name="websocket" valuePropName="checked">
      <Switch />
    </Form.Item>
  );
};

export default Websocket;
