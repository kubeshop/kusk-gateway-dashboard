import {useEffect} from 'react';

import {Form, FormInstance, Switch} from 'antd';

import {useAppSelector} from '@redux/hooks';

interface IProps {
  form: FormInstance<any>;
}

const Validation: React.FC<IProps> = props => {
  const {form} = props;

  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi) || {};

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
