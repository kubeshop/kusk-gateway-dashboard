import {Form, Input, Switch, Typography} from 'antd';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const Caching = ({xKusk, onFinish, onCancel}: IProps) => {
  const [form] = Form.useForm();
  const enabled = Form.useWatch(['x-kusk', 'cache', 'enabled'], form);
  return (
    <FormCard
      enableCancelButton
      heading="Caching"
      subHeading="Current support for caching is experimental"
      helpTopic="Caching"
      helpLink="https://docs.kusk.io/guides/cache"
      formProps={{onFinish, form}}
      cancelEditMode={onCancel}
      cardProps={{
        extra: (
          <Form.Item name={['x-kusk', 'cache', 'enabled']} valuePropName="checked" initialValue={xKusk?.cache?.enabled}>
            <Switch />
          </Form.Item>
        ),
      }}
    >
      <S.CardItem>
        <Typography.Text type="secondary">Max age (in seconds)</Typography.Text>
        <Form.Item
          name={['x-kusk', 'cache', 'max_age']}
          initialValue={xKusk?.cache?.max_age || 60}
          getValueFromEvent={e => Number(e.target.value)}
        >
          <Input type="number" disabled={!enabled} />
        </Form.Item>
      </S.CardItem>

      <S.Divider />
    </FormCard>
  );
};
export default Caching;
