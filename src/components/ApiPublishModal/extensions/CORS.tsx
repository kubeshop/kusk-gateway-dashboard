import {useEffect} from 'react';

import {Checkbox, Form, FormInstance, Switch} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';

import {FormList} from '@components';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1).map(method => method.toUpperCase());

interface IProps {
  form: FormInstance<any>;
}

const CORS: React.FC<IProps> = props => {
  const {form} = props;

  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi || {});

  useEffect(() => {
    const cors = openApiSpec['x-kusk']?.cors;

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

      <Form.Item label="Methods" name={['cors', 'methods']}>
        <Checkbox.Group>
          {METHODS.map(method => (
            <Checkbox value={method}>{method}</Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>

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
