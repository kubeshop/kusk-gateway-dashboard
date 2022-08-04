import {Form, InputNumber, Switch, Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';

import {FormCard} from '@components/FormCard';

import * as S from './styled';

const Caching = () => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec['x-kusk'];
  return (
    <FormCard
      heading="Caching"
      subHeading="Current support for caching is experimental"
      helpTopic="Caching"
      helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#caching"
      cardProps={{
        extra: (
          <Form.Item name={['caching', 'enabled']} valuePropName="checked" initialValue={xKusk?.cache?.enabled}>
            <Switch />
          </Form.Item>
        ),
      }}
    >
      <S.CardItem>
        <Typography.Text type="secondary">Max age (in seconds)</Typography.Text>
        <Form.Item name={['caching', 'max_age']} initialValue={xKusk?.cache?.max_age || 60}>
          <InputNumber />
        </Form.Item>
      </S.CardItem>

      <S.Divider />
    </FormCard>
  );
};
export default Caching;
