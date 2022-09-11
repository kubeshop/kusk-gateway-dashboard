import {Form, Input, Switch} from 'antd';

// import _ from 'lodash';
import {SUPPORTED_METHODS} from '@constants/constants';

import {Divider} from '@components/AntdCustom';
// import {useAppSelector} from '@redux/hooks';
import {FormCard} from '@components/FormCard';
import {FormList} from '@components/FormList';

import * as S from './CORS.styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1).map(method => method.toUpperCase());

const CORS = () => {
  // const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);
  // const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);
  // const cors = _.find(selectedRouteSpec?.spec?.paths[selectedRoutePath], 'cors');

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
          name={['x-kusk', 'cors', 'origins']}
          requiredMessage="Enter origin or delete the field."
        />
        <Divider />
      </FormCard>

      <FormCard
        heading="Methods"
        subHeading="Which CORS request methods would you like to allow?"
        helpTopic="CORS Request Methods"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
      >
        <Form.Item name={['x-kusk', 'cors', 'methods']}>
          <S.CheckboxGroup>
            {METHODS.map(method => (
              <S.Checkbox key={method} value={method}>
                {method}
              </S.Checkbox>
            ))}
          </S.CheckboxGroup>
        </Form.Item>
        <Divider />
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
          name={['x-kusk', 'cors', 'headers']}
          requiredMessage="Enter header or delete the field."
        />
        <Divider />
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
          name={['x-kusk', 'cors', 'exposed_headers']}
          requiredMessage="Enter header or delete the field."
        />
        <Divider />
      </FormCard>

      <FormCard
        heading="Credentials"
        subHeading="Please provide the Credentials"
        helpTopic="Origins"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
        cardProps={{
          extra: (
            <Form.Item label="Credentials" name={['x-kusk', 'cors', 'credentials']} valuePropName="checked">
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
          name={['x-kusk', 'cors', 'max_age']}
          getValueFromEvent={e => Number(e.target.value)}
        >
          <Input type="number" />
        </Form.Item>
        <Divider />
      </FormCard>
    </S.Container>
  );
};
export default CORS;
