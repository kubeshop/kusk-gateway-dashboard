import {useEffect} from 'react';

import {Form, FormInstance, Switch} from 'antd';

import {useAppSelector} from '@redux/hooks';

import {FormList} from '@components';

import * as S from './styled';

interface IProps {
  form: FormInstance<any>;
}

const CORS: React.FC<IProps> = props => {
  const {form} = props;

  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi) || {};

  useEffect(() => {
    const cors = openApiSpec['x-kusk'].cors;

    if (!cors) {
      return;
    }

    form.setFieldsValue({cors});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openApiSpec]);

  return (
    <>
      <FormList
        addButtonText="Add origin"
        label="Origins"
        name={['cors', 'origins']}
        requiredMessage="Enter origin or delete the field."
      />

      <FormList
        addButtonText="Add method"
        label="Methods"
        name={['cors', 'methods']}
        requiredMessage="Enter method or delete the field."
      />

      <FormList
        addButtonText="Add header"
        label="Headers"
        name={['cors', 'headers']}
        requiredMessage="Enter header or delete the field."
      />

      <FormList
        addButtonText="Add expose header"
        label="Expose headers"
        name={['cors', 'expose_headers']}
        requiredMessage="Enter expose header or delete the field."
      />

      <Form.Item label="Credentials" name={['cors', 'credentials']} valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="Max age" name={['cors', 'max_age']}>
        <S.Input type="number" />
      </Form.Item>
    </>
  );
};

export default CORS;
