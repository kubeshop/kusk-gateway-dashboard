import {useDispatch} from 'react-redux';

import {Checkbox, Form, Input, Switch} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';
import {updateApiSettings} from '@redux/reducers/main';

import {FormCard, FormList} from '@components/FormComponents';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1).map(method => method.toUpperCase());

const CORS = () => {
  const dispatch = useDispatch();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];

  const onSaveClickHandler = (values: any) => {
    dispatch(updateApiSettings({editedOpenapi: values}));
  };
  return (
    <S.Container>
      <FormCard
        heading="Origins"
        subHeading="Please provide the CORS origin"
        helpTopic="Origins"
        helpLink="https://docs.kusk.io/extension/#cors"
        formProps={{onFinish: onSaveClickHandler}}
      >
        <FormList
          addButtonText="Add a new origin"
          label="Origins"
          name={['x-kusk', 'cors', 'origins']}
          initialValue={xKusk?.cors?.origins}
          requiredMessage="Enter origin or delete the field."
        />

        <S.Divider />
      </FormCard>

      <FormCard
        heading="Methods"
        subHeading="Which CORS request methods would you like to allow?"
        helpTopic="CORS Request Methods"
        helpLink="https://docs.kusk.io/extension/#cors"
        formProps={{onFinish: onSaveClickHandler}}
      >
        <Form.Item name={['x-kusk', 'cors', 'methods']} initialValue={xKusk?.cors?.methods}>
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
        helpLink="https://docs.kusk.io/extension/#cors"
        formProps={{onFinish: onSaveClickHandler}}
      >
        <FormList
          addButtonText="Add a new header"
          label="Headers"
          name={['x-kusk', 'cors', 'headers']}
          initialValue={xKusk?.cors?.headers}
        />
        <S.Divider />
      </FormCard>

      <FormCard
        heading="Exposed Headers"
        subHeading="Please provide the CORS exposed headers"
        helpTopic="Origins"
        helpLink="https://docs.kusk.io/extension/#cors"
        formProps={{onFinish: onSaveClickHandler}}
      >
        <FormList
          addButtonText="Add a new exposed header"
          label="Headers"
          name={['x-kusk', 'cors', 'exposed_headers']}
          initialValue={xKusk?.cors?.expose_headers}
        />
        <S.Divider />
      </FormCard>

      <FormCard
        heading="Credentials"
        subHeading="Please provide the Credentials"
        helpTopic="Origins"
        helpLink="https://docs.kusk.io/extension/#cors"
        formProps={{onFinish: onSaveClickHandler}}
        cardProps={{
          extra: (
            <Form.Item
              label="Credentials"
              name={['x-kusk', 'cors', 'credentials']}
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
        helpLink="https://docs.kusk.io/extension/#cors"
        formProps={{layout: 'vertical', onFinish: onSaveClickHandler}}
      >
        <Form.Item
          label="Max age (in seconds)"
          name={['x-kusk', 'cors', 'max_age']}
          initialValue={xKusk?.cors?.max_age}
          getValueFromEvent={e => Number(e.target.value)}
          rules={[{required: true, message: 'Enter Max age'}]}
        >
          <Input type="number" />
        </Form.Item>
        <S.Divider />
      </FormCard>
    </S.Container>
  );
};
export default CORS;
