import {Form, Input} from 'antd';

import {FormCard} from '@components/FormComponents';

import * as S from './styled';

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const Caching = ({xKusk, onFinish, onCancel}: IProps) => {
  const [form] = Form.useForm();
  return (
    <FormCard
      enableCancelButton
      heading="Caching"
      subHeading="Current support for caching is experimental"
      helpTopic="Caching"
      helpLink="https://docs.kusk.io/guides/cache"
      formProps={{onFinish, form, layout: 'vertical'}}
      cancelEditMode={onCancel}
    >
      <S.CardItem>
        <Form.Item hidden name={['x-kusk', 'cache', 'enabled']} initialValue={Boolean(true)} />

        <Form.Item
          name={['x-kusk', 'cache', 'max_age']}
          label="Max age (in seconds)"
          initialValue={xKusk?.cache?.max_age}
          getValueFromEvent={e => Number(e.target.value)}
          rules={[{required: true, message: 'Set cache max age'}]}
        >
          <Input type="number" placeholder="ex: 60" />
        </Form.Item>
      </S.CardItem>

      <S.Divider />
    </FormCard>
  );
};
export default Caching;
