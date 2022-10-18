import {Checkbox, Form, Input, Switch} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';

import {FormCard, FormList} from '@components/FormComponents';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1).map(method => method.toUpperCase());

interface IProps {
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const CORS = ({onFinish, onCancel}: IProps) => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];

  return (
    <S.Container>
      <FormCard
        enableCancelButton
        heading="Origins"
        subHeading="Please provide the CORS origin"
        helpTopic="Origins"
        helpLink="https://docs.kusk.io/extension/#cors"
        formProps={{onFinish}}
        cancelEditMode={onCancel}
      >
        <FormList
          addButtonText="Add a new origin"
          label="Origins"
          name={['cors', 'origins']}
          initialValue={xKusk?.cors?.origins}
          requiredMessage="Enter origin or delete the field."
        />

        <S.Divider />
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
        <FormList
          addButtonText="Add a new header"
          label="Headers"
          name={['cors', 'headers']}
          initialValue={xKusk?.cors?.headers}
          requiredMessage="Enter header or delete the field."
        />
        <S.Divider />
        <FormList
          addButtonText="Add a new exposed header"
          label="Headers"
          name={['cors', 'exposed_headers']}
          initialValue={xKusk?.cors?.expose_headers}
          requiredMessage="Enter header or delete the field."
        />
        <S.Divider />
        <Form.Item
          label="Credentials"
          name={['cors', 'credentials']}
          valuePropName="checked"
          initialValue={xKusk?.cors?.credentials}
        >
          <Switch />
        </Form.Item>
        <S.Divider />

        <Form.Item
          label="Max age (in seconds)"
          name={['cors', 'max_age']}
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
