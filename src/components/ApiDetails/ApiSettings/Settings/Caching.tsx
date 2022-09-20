import {useDispatch} from 'react-redux';

import {Form, InputNumber, Switch, Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {updateApiSettings} from '@redux/reducers/main';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

const Caching = () => {
  const dispatch = useDispatch();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];

  const onSaveClickHandler = (values: any) => {
    dispatch(updateApiSettings({editedOpenapi: values}));
  };
  return (
    <FormCard
      heading="Caching"
      subHeading="Current support for caching is experimental"
      helpTopic="Caching"
      helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#caching"
      formProps={{onFinish: onSaveClickHandler}}
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
        <Form.Item name={['x-kusk', 'cache', 'max_age']} initialValue={xKusk?.cache?.max_age || 60}>
          <InputNumber />
        </Form.Item>
      </S.CardItem>

      <S.Divider />
    </FormCard>
  );
};
export default Caching;
