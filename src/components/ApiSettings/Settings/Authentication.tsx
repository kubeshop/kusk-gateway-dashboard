import {Card, Input, InputNumber, Select, Switch, Typography} from 'antd';

import {CardHeading} from '@components/AntdCustom';

import * as S from './styled';

const Authentication = () => {
  return (
    <Card
      title={<CardHeading heading="Authentication" subHeading="Configure HTTP Authentication for your API " />}
      extra={<Switch />}
    >
      <S.CardItem>
        <Typography.Text>Authentication scheme</Typography.Text>
        <Select value="basic">
          <Select.Option value="basic">Basic</Select.Option>
        </Select>
      </S.CardItem>

      <S.CardItem>
        <Typography.Text>Path prefix</Typography.Text>
        <Input placeholder="Path prefix" />
      </S.CardItem>

      <S.Row>
        <S.CardItem style={{flex: 1}}>
          <Typography.Text>Hostname</Typography.Text>
          <Input placeholder="https://example.com" />
        </S.CardItem>

        <S.CardItem>
          <Typography.Text>Port</Typography.Text>
          <InputNumber value={443} />
        </S.CardItem>
      </S.Row>

      <S.Divider />

      <S.CardActions>
        <Typography.Text type="secondary">
          Learn more about&nbsp;
          <Typography.Link
            href="https://kubeshop.github.io/kusk-gateway/reference/extension/#authentication"
            target="_blank"
          >
            Authentication
          </Typography.Link>
        </Typography.Text>
        <S.SaveButton>Save</S.SaveButton>
      </S.CardActions>
    </Card>
  );
};

export default Authentication;
