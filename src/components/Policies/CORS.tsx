import {Checkbox, Form, Input, Typography} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';

import {FormCard, FormList} from '@components/FormComponents';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1).map(method => method.toUpperCase());

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const CORS = ({xKusk, onFinish, onCancel}: IProps) => {
  return (
    <S.Container>
      <FormCard
        enableCancelButton
        heading="Cross Origin Resource Sharing"
        subHeading=""
        helpTopic="Origins"
        helpLink="https://docs.kusk.io/extension/#cors"
        formProps={{onFinish, layout: 'vertical'}}
        cancelEditMode={onCancel}
      >
        <FormList
          addButtonText="Add a new origin"
          label="Origin"
          name={['x-kusk', 'cors', 'origins']}
          initialValue={xKusk?.cors?.origins || ['']}
          requiredMessage="Enter origin or delete the field."
          required
        />

        <S.Divider />
        <Typography.Title level={5}>Methods</Typography.Title>

        <Form.Item
          label="Which CORS request methods would you like to allow?"
          name={['x-kusk', 'cors', 'methods']}
          initialValue={xKusk?.cors?.methods}
          rules={[{required: true, message: 'Select a method'}]}
        >
          <Checkbox.Group>
            {METHODS.map(method => (
              <Checkbox key={method} value={method}>
                {method}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <S.Divider />
        <Typography.Title level={5}>Headers</Typography.Title>

        <FormList
          addButtonText="Add a new header"
          label="CORS header"
          name={['x-kusk', 'cors', 'headers']}
          initialValue={xKusk?.cors?.headers}
        />
        <S.Divider />

        <Typography.Title level={5}>Expose Headers</Typography.Title>

        <FormList
          addButtonText="Add a new exposed header"
          label="Expose header"
          name={['x-kusk', 'cors', 'exposed_headers']}
          initialValue={xKusk?.cors?.expose_headers}
        />
        <S.Divider />
        <Typography.Title level={5}>Credentials</Typography.Title>

        <Form.Item
          name={['x-kusk', 'cors', 'credentials']}
          valuePropName="checked"
          initialValue={xKusk?.cors?.credentials}
        >
          <Checkbox>Require credentials</Checkbox>
        </Form.Item>
        <S.Divider />

        <Typography.Title level={5}>Max Age</Typography.Title>
        <Form.Item
          label="CORS max age (in seconds)"
          name={['x-kusk', 'cors', 'max_age']}
          initialValue={xKusk?.cors?.max_age}
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
