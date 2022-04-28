import {Button, Form, Input} from 'antd';

import {ContentWrapper} from '@components/AntdCustom';

import * as S from './styled';

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const onFinishHandler = (values: any) => {
    const {apiEndpoint} = values;

    console.log(apiEndpoint);
  };

  return (
    <ContentWrapper>
      <S.Form form={form} layout="vertical" onFinish={onFinishHandler}>
        <Form.Item label="API Endpoint" name="apiEndpoint">
          <Input placeholder="Enter API endpoint" type="text" />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          Apply
        </Button>
      </S.Form>
    </ContentWrapper>
  );
};

export default Settings;
