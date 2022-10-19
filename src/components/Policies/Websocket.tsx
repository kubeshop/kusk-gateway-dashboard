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
      heading="Websocket"
      subHeading='Handle "Upgrade: websocket" and other actions related to Websocket HTTP headers.'
      formProps={{onFinish}}
      cancelEditMode={onCancel}
      helpLink="https://docs.kusk.io/extension#websocket"
      helpTopic="Websockets"
    >
      <Form.Item name={['x-kusk', 'websocket']} valuePropName="checked" initialValue={Boolean(xKusk?.websocket)}>
        <Checkbox>Enable websocket</Checkbox>
      </Form.Item>
      <S.Divider />
    </FormCard>
  );
};
export default Validation;
