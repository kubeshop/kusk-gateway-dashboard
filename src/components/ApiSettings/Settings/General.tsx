import {Card, Input, Select, Switch, Typography} from 'antd';

import {CardHeading} from '@components/AntdCustom';

import * as S from './styled';

const GeneralSettings = () => {
  return (
    <S.Container>
      <Card title={<CardHeading heading="Display name" subHeading="Please provide the display name of your API" />}>
        <Input placeholder="My first API being renamed" />
        <S.Divider />
        <S.CardActions>
          <S.SaveButton>Save</S.SaveButton>
        </S.CardActions>
      </Card>

      <Card
        title={
          <CardHeading
            heading="Namespace & Labels"
            subHeading="Define which namespace and labels this API is assigned to"
          />
        }
      >
        <S.CardItem>
          <Typography.Text type="secondary">Namespace</Typography.Text>
          <Select placeholder="namespace" />
        </S.CardItem>
        <S.CardItem>
          <Typography.Text type="secondary">Labels</Typography.Text>
          <Select placeholder="label" />
        </S.CardItem>
        <S.Divider />

        <S.CardActions>
          <Typography.Text type="secondary">
            Learn more about&nbsp;
            <Typography.Link href="https://kubeshop.github.io/kusk-gateway/customresources/api/" target="_blank">
              Namespaces & Labels
            </Typography.Link>
          </Typography.Text>
          <S.SaveButton>Save</S.SaveButton>
        </S.CardActions>
      </Card>

      <Card title={<CardHeading heading="API Prefix" subHeading="Define your prefix for every route on this API" />}>
        <Input value="/api/" />
        <S.Divider />
        <S.CardActions>
          <Typography.Text type="secondary">
            Learn more about&nbsp;
            <Typography.Link href="https://kubeshop.github.io/kusk-gateway/reference/extension/#path" target="_blank">
              API Prefixes
            </Typography.Link>
          </Typography.Text>
          <S.SaveButton>Save</S.SaveButton>
        </S.CardActions>
      </Card>

      <Card
        title={
          <CardHeading
            heading="Request validation"
            subHeading="Validate all incoming requests against the corresponding OpenAPI definition."
          />
        }
        extra={<Switch />}
      >
        <S.CardActions>
          <Typography.Text type="secondary">
            Learn more about&nbsp;
            <Typography.Link
              href="https://kubeshop.github.io/kusk-gateway/reference/extension/#validation"
              target="_blank"
            >
              Request validation
            </Typography.Link>
          </Typography.Text>
          <S.SaveButton>Save</S.SaveButton>
        </S.CardActions>
      </Card>
      <Card
        title={
          <CardHeading
            heading="Websocket"
            subHeading='Handle "Upgrade: websocket" and other actions related to Websocket HTTP headers.'
          />
        }
        extra={<Switch />}
      >
        <S.CardActions>
          <Typography.Text type="secondary">
            Learn more about&nbsp;
            <Typography.Link
              href="https://kubeshop.github.io/kusk-gateway/reference/extension/#websocket"
              target="_blank"
            >
              Websockets
            </Typography.Link>
          </Typography.Text>
          <S.SaveButton>Save</S.SaveButton>
        </S.CardActions>
      </Card>

      <S.DeleteCard
        title={
          <CardHeading
            heading="Delete this API"
            subHeading="The API will be permanently deleted, including its deployments and all of its history. This action is irreversible and can not be undone."
          />
        }
      >
        <S.DeleteButton size="large">Delete</S.DeleteButton>
      </S.DeleteCard>
    </S.Container>
  );
};
export default GeneralSettings;
