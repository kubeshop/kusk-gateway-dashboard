import {Checkbox, Form} from 'antd';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const Validation = ({xKusk, onFinish, onCancel}: IProps) => {
  return (
    <FormCard
      enableCancelButton
      heading="Request validation"
      subHeading="Validate all incoming requests against the corresponding OpenAPI definition."
      formProps={{onFinish}}
      cancelEditMode={onCancel}
      helpLink="https://docs.kusk.io/extension/#validation"
      helpTopic="Request validation"
    >
      <Form.Item
        name={['x-kusk', 'validation', 'request', 'enabled']}
        valuePropName="checked"
        initialValue={xKusk?.validation?.request?.enabled}
      >
        <Checkbox>Enable request validation</Checkbox>
      </Form.Item>
      <S.Divider />
    </FormCard>
  );
};
export default Validation;
