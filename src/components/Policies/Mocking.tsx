import {Checkbox, Form} from 'antd';

import {useAppSelector} from '@redux/hooks';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

interface IProps {
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const Mocking = ({onFinish, onCancel}: IProps) => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];

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
      <Form.Item name={['mocking', 'enabled']} valuePropName="checked" initialValue={xKusk}>
        <Checkbox>Mock responses</Checkbox>
      </Form.Item>
      <S.Divider />
    </FormCard>
  );
};
export default Mocking;
