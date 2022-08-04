import {Checkbox, Form, Input, Switch} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';

import {FormCard} from '@components/FormCard';
import {FormList} from '@components/FormList';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1).map(method => method.toUpperCase());

const CORS = () => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec['x-kusk'];

  return (
    <S.Container>
      <FormCard
        heading="Origins"
        subHeading="Please provide the CORS origin"
        helpTopic="Origins"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
      >
        <FormList
          addButtonText="Add a new origin"
          label="Origins"
          name={['cors', 'origins']}
          initialValue={xKusk?.cors?.origins}
          requiredMessage="Enter origin or delete the field."
        />

        <S.Divider />
      </FormCard>

      <FormCard
        heading="Methods"
        subHeading="Which CORS request methods would you like to allow?"
        helpTopic="CORS Request Methods"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
      >
        <Form.Item name={['cors', 'methods']} initialValue={xKusk?.cors?.methods}>
          <Checkbox.Group>
            {METHODS.map(method => (
              <Checkbox key={method} value={method}>
                {method}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <S.Divider />
      </FormCard>

      <FormCard
        heading="Headers"
        subHeading="Please provide the CORS headers"
        helpTopic="Origins"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
      >
        <FormList
          addButtonText="Add a new header"
          label="Headers"
          name={['cors', 'headers']}
          initialValue={xKusk?.cors?.headers}
          requiredMessage="Enter header or delete the field."
        />
        <S.Divider />
      </FormCard>

      <FormCard
        heading="Exposed Headers"
        subHeading="Please provide the CORS exposed headers"
        helpTopic="Origins"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
      >
        <FormList
          addButtonText="Add a new exposed header"
          label="Headers"
          name={['cors', 'exposed_headers']}
          initialValue={xKusk?.cors?.expose_headers}
          requiredMessage="Enter header or delete the field."
        />
        <S.Divider />
      </FormCard>

      <FormCard
        heading="Credentials"
        subHeading="Please provide the Credentials"
        helpTopic="Origins"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
        cardProps={{
          extra: (
            <Form.Item
              label="Credentials"
              name={['cors', 'credentials']}
              valuePropName="checked"
              initialValue={xKusk?.cors?.credentials}
            >
              <Switch />
            </Form.Item>
          ),
        }}
      />

      <FormCard
        heading="CORS Max age"
        subHeading="Please provide the CORS exposed headers"
        helpTopic="Origins"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
        formProps={{layout: 'vertical'}}
      >
        <Form.Item
          label="Max age (in seconds)"
          name={['cors', 'max_age']}
          initialValue={xKusk?.cors?.max_age || 60}
          getValueFromEvent={e => Number(e.target.value)}
        >
          <Input type="number" />
        </Form.Item>
        <S.Divider />
      </FormCard>
    </S.Container>
  );
};
export default CORS;
