import {Card, InputNumber, Typography} from 'antd';

import {CardHeading} from '@components/AntdCustom';

import * as S from './styled';

const QOS = () => {
  return (
    <Card title={<CardHeading heading="QoS" subHeading="Configure your quality of service settings" />}>
      <S.CardItem>
        <Typography.Text>Maximum number of retries</Typography.Text>
        <InputNumber value={10} />
      </S.CardItem>

      <S.CardItem>
        <Typography.Text>Total request timeout (in seconds).</Typography.Text>
        <InputNumber value={10} />
      </S.CardItem>

      <S.CardItem>
        <Typography.Text>Timeout for idle connections (in seconds).</Typography.Text>
        <InputNumber value={60} />
      </S.CardItem>

      <S.Divider />

      <S.CardActions>
        <Typography.Text type="secondary">
          Learn more about&nbsp;
          <Typography.Link href="https://kubeshop.github.io/kusk-gateway/reference/extension/#qos" target="_blank">
            QoS
          </Typography.Link>
        </Typography.Text>
        <S.SaveButton>Save</S.SaveButton>
      </S.CardActions>
    </Card>
  );
};

export default QOS;
