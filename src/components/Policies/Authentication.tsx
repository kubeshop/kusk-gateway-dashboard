import {Form, Input, InputNumber} from 'antd';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const Authentication = ({xKusk, onFinish, onCancel}: IProps) => {
  const [form] = Form.useForm();

  const onSaveClickHandler = (values: any) => {
    onFinish(values);
  };

  return (
    <FormCard
      enableCancelButton
      heading="Custom Authentication"
      subHeading="Configure HTTP Authentication for your API"
      helpTopic="Authentication"
      helpLink="https://docs.kusk.io/extension#authentication"
      formProps={{form, layout: 'vertical', onFinish: onSaveClickHandler}}
      cancelEditMode={onCancel}
    >
      <Form.Item
        shouldUpdate={(prevValues, curValues) => prevValues.enabled !== curValues.enabled}
        label="Path Prefix"
        name={['x-kusk', 'auth', 'custom', 'path_prefix']}
        initialValue={xKusk?.auth?.custom?.path_prefix}
      >
        <Input placeholder="e.g. /login" />
      </Form.Item>

      <S.Row>
        <S.CardItem style={{flex: 1}}>
          <Form.Item
            label="Hostname"
            name={['x-kusk', 'auth', 'custom', 'host', 'hostname']}
            initialValue={xKusk?.auth?.custom?.host?.hostname}
            rules={[
              {
                required: true,
                message: 'Please enter hostname',
              },
            ]}
          >
            <Input placeholder="e.g. example.com" />
          </Form.Item>
        </S.CardItem>
        <Form.Item
          label="Port"
          name={['x-kusk', 'auth', 'custom', 'host', 'port']}
          initialValue={xKusk?.auth?.custom?.host?.port}
          rules={[
            {
              required: true,
              message: 'Please enter port',
            },
          ]}
        >
          <InputNumber
            style={{minWidth: '100%'}}
            placeholder="Target port to which requests should be routed"
            type="number"
          />
        </Form.Item>
      </S.Row>

      <S.Divider />
    </FormCard>
  );
};
export default Authentication;
