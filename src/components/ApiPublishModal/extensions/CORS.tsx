import {useEffect, useState} from 'react';

import {Button, Checkbox, Form, FormInstance, Switch} from 'antd';

import styled from 'styled-components';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';

import {FormList} from '@components';

import Colors from '@styles/colors';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1).map(method => method.toUpperCase());

interface IProps {
  form: FormInstance<any>;
}

const StyledButton = styled(Button)`
  color: ${Colors.blue700};
  border: none;

  &:focus {
    color: ${Colors.blue700};
  }
`;

const CORS: React.FC<IProps> = props => {
  const {form} = props;

  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi || {});

  const [areCheckedAll, setAreCheckedAll] = useState(false);

  const onCheckHandler = () => {
    if (areCheckedAll) {
      form.setFieldsValue({cors: {methods: []}});
      setAreCheckedAll(false);
    } else {
      form.setFieldsValue({cors: {methods: METHODS}});
      setAreCheckedAll(true);
    }
  };

  useEffect(() => {
    const cors = openApiSpec['x-kusk']?.cors;

    if (!cors) {
      return;
    }

    form.setFieldsValue({cors});
  }, [form, openApiSpec]);

  return (
    <>
      <FormList
        addButtonText="Add origin"
        label="Origins"
        name={['cors', 'origins']}
        requiredMessage="Enter origin or delete the field."
      />

      <Form.Item
        label={
          <div>
            Methods{' '}
            <StyledButton type="ghost" onClick={onCheckHandler}>
              {areCheckedAll ? 'Uncheck all' : 'Check all'}
            </StyledButton>
          </div>
        }
        name={['cors', 'methods']}
      >
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
