import {Card, InputNumber, Typography} from 'antd';

import {CardHeading} from '@components/AntdCustom';

import * as S from './styled';

const Caching = () => {
  return (
    <Card title={<CardHeading heading="Caching" subHeading="Current support for caching is experimental" />}>
      <S.CardItem>
        <Typography.Text type="secondary">Max age (in seconds)</Typography.Text>
        <InputNumber value={60} />
      </S.CardItem>
      <S.Divider />
      <S.CardActions>
        <Typography.Text type="secondary">
          Learn more about&nbsp;
          <Typography.Link href="https://kubeshop.github.io/kusk-gateway/reference/extension/#caching" target="_blank">
            Caching
          </Typography.Link>
        </Typography.Text>
        <S.SaveButton>Save</S.SaveButton>
      </S.CardActions>
    </Card>
  );
};
export default Caching;
