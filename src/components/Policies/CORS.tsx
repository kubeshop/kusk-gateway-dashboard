import {Checkbox, Form, Input} from 'antd';

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
        heading="Origins"
        subHeading="Please provide the CORS origin"
        helpTopic="Origins"
        helpLink="https://docs.kusk.io/extension/#cors"
        formProps={{onFinish, layout: 'vertical'}}
        cancelEditMode={onCancel}
      >
        <FormList
          addButtonText="Add a new origin"
          label="Origins"
          name={['x-kusk', 'cors', 'origins']}
          initialValue={xKusk?.cors?.origins}
          requiredMessage="Enter origin or delete the field."
        />

        <S.Divider />
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
        <FormList
          addButtonText="Add a new header"
          label="Headers"
          name={['x-kusk', 'cors', 'headers']}
          initialValue={xKusk?.cors?.headers}
          requiredMessage="Enter header or delete the field."
        />
        <S.Divider />
        <FormList
          addButtonText="Add a new exposed header"
          label="Expose Headers"
          name={['x-kusk', 'cors', 'exposed_headers']}
          initialValue={xKusk?.cors?.expose_headers}
          requiredMessage="Enter header or delete the field."
        />
        <S.Divider />
        <Form.Item
          label="Credentials"
          name={['x-kusk', 'cors', 'credentials']}
          valuePropName="checked"
          initialValue={xKusk?.cors?.credentials}
        >
          <Checkbox>Require credentials</Checkbox>
        </Form.Item>
        <S.Divider />

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
