import {useEffect} from 'react';

import {Form, FormInstance, Switch} from 'antd';

interface IProps {
  form: FormInstance<any>;
  openApiSpec: {[key: string]: any};
}

const Validation: React.FC<IProps> = props => {
  const {form, openApiSpec} = props;

  useEffect(() => {
    const validation = openApiSpec['x-kusk'].validation;

    if (!validation) {
      return;
    }

    form.setFieldsValue({validation});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openApiSpec]);

  return (
    <Form.Item label="Request validation" name={['validation', 'request', 'enabled']} valuePropName="checked">
      <Switch />
    </Form.Item>
  );
};

export default Validation;
