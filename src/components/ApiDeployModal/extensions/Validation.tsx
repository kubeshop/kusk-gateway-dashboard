import {useEffect} from 'react';

import {Form, FormInstance, Switch} from 'antd';

import {useAppSelector} from '@redux/hooks';

interface IProps {
  form: FormInstance<any>;
  isApiMocked: boolean;
}

const Validation: React.FC<IProps> = props => {
  const {form, isApiMocked} = props;

  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi) || {};

  useEffect(() => {
    const validation = openApiSpec['x-kusk'].validation;

    if (!validation) {
      return;
    }

    if (isApiMocked) {
      form.resetFields();
    } else {
      form.setFieldsValue({validation});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApiMocked, openApiSpec]);

  return (
    <Form.Item label="Request validation" name={['validation', 'request', 'enabled']} valuePropName="checked">
      <Switch disabled={isApiMocked} />
    </Form.Item>
  );
};

export default Validation;
