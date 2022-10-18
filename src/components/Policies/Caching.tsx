import {Form, InputNumber, Switch, Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

interface IProps {
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const Caching = ({onFinish, onCancel}: IProps) => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];

  return (
    <FormCard
      enableCancelButton
      heading="Caching"
      subHeading="Current support for caching is experimental"
      helpTopic="Caching"
      helpLink="https://docs.kusk.io/guides/cache"
      formProps={{onFinish}}
      cancelEditMode={onCancel}
      cardProps={{
        extra: (
          <Form.Item name={['cache', 'enabled']} valuePropName="checked" initialValue={xKusk?.cache?.enabled}>
            <Switch />
          </Form.Item>
        ),
      }}
    >
      <S.CardItem>
        <Typography.Text type="secondary">Max age (in seconds)</Typography.Text>
        <Form.Item name={['cache', 'max_age']} initialValue={xKusk?.cache?.max_age || 60}>
          <InputNumber />
        </Form.Item>
      </S.CardItem>

      <S.Divider />
    </FormCard>
  );
};
export default Caching;
