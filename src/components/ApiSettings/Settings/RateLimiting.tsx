import {Card, Checkbox, InputNumber, Select, Typography} from 'antd';

import styled from 'styled-components';

import {CardHeading} from '@components/AntdCustom';

import * as S from './styled';

const CardLayout = styled.div`
  display: grid;
  grid-template-columns: 40% 40% 20%;
  grid-gap: 12px;
`;

const RateLimiting = () => {
  return (
    <Card
      title={<CardHeading heading="Rate Limiting" subHeading="Limit the amount of requests this API should handle" />}
    >
      <CardLayout>
        <S.CardItem>
          <Typography.Text>Requests per unit</Typography.Text>
          <InputNumber value={10} />
        </S.CardItem>

        <S.CardItem>
          <Typography.Text>Time unit</Typography.Text>
          <Select />
        </S.CardItem>

        <S.CardItem>
          <Typography.Text>Response code</Typography.Text>
          <InputNumber value={405} />
        </S.CardItem>
      </CardLayout>

      <Checkbox>Apply these limits for each individual connection only</Checkbox>
      <S.Divider />

      <S.CardActions>
        <Typography.Text type="secondary">
          Learn more about&nbsp;
          <Typography.Link
            href="https://kubeshop.github.io/kusk-gateway/reference/extension/#rate-limiting"
            target="_blank"
          >
            Rate Limiting
          </Typography.Link>
        </Typography.Text>
        <S.SaveButton>Save</S.SaveButton>
      </S.CardActions>
    </Card>
  );
};

export default RateLimiting;
