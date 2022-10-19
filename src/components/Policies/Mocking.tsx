import {Checkbox, Form} from 'antd';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const Mocking = ({xKusk, onFinish, onCancel}: IProps) => {
  return (
    <FormCard
      enableCancelButton
      heading="Mocking"
      subHeading="Set mocking policy to return a response based on the defined samples."
      formProps={{onFinish}}
      cancelEditMode={onCancel}
      helpLink="https://docs.kusk.io/extension/#mocking"
      helpTopic="Mocking"
    >
      <Form.Item name={['x-kusk', 'mocking', 'enabled']} valuePropName="checked" initialValue={xKusk?.mocking?.enabled}>
        <Checkbox>Mock responses</Checkbox>
      </Form.Item>

      <Form.Item name={['x-kusk', 'upstream']} hidden initialValue={null} />
      <Form.Item name={['x-kusk', 'redirect']} hidden initialValue={null} />

      <S.Divider />
    </FormCard>
  );
};
export default Mocking;
