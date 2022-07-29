import {Card, Select, Typography} from 'antd';

import {CardHeading} from '@components/AntdCustom';

import * as S from './styled';

const Deployments = () => {
  return (
    <Card title={<CardHeading heading="Deployments" subHeading="Select which environment to deploy this API to" />}>
      <S.CardItem>
        <Select />
      </S.CardItem>
      <S.Divider />

      <S.CardActions>
        <Typography.Text type="secondary">
          Learn more about&nbsp;
          <Typography.Link href="https://kubeshop.github.io/kusk-gateway/customresources/envoyfleet/" target="_blank">
            Environments and Envoy Fleet
          </Typography.Link>
        </Typography.Text>
        <S.SaveButton>Save</S.SaveButton>
      </S.CardActions>
    </Card>
  );
};

export default Deployments;
