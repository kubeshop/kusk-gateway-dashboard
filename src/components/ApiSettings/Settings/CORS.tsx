import {Card, Checkbox, Input, Typography} from 'antd';

import {DeleteOutlined} from '@ant-design/icons';

import {SUPPORTED_METHODS} from '@constants/constants';

import {CardHeading} from '@components/AntdCustom';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1).map(method => method.toUpperCase());

const CORS = () => {
  const origins: string[] = [];
  return (
    <S.Container>
      <Card title={<CardHeading heading="Origins" subHeading="Please provide the CORS origin" />}>
        {origins.map(origin => (
          <S.Row key={origin}>
            <Input value={origin} />
            <DeleteOutlined />
          </S.Row>
        ))}
        <S.AddButton>Add a new origin</S.AddButton>

        <S.Divider />
        <S.CardActions>
          <Typography.Text type="secondary">
            Learn more about&nbsp;
            <Typography.Link href="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors" target="_blank">
              Origins
            </Typography.Link>
          </Typography.Text>
          <S.SaveButton>Save</S.SaveButton>
        </S.CardActions>
      </Card>

      <Card title={<CardHeading heading="Methods" subHeading="Which CORS request methods would you like to allow?" />}>
        <Checkbox.Group>
          {METHODS.map(method => (
            <Checkbox key={method} value={method}>
              {method}
            </Checkbox>
          ))}
        </Checkbox.Group>
        <S.Divider />
        <S.CardActions>
          <Typography.Text type="secondary">
            Learn more about&nbsp;
            <Typography.Link href="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors" target="_blank">
              CORS Request Methods
            </Typography.Link>
          </Typography.Text>
          <S.SaveButton>Save</S.SaveButton>
        </S.CardActions>
      </Card>

      <Card title={<CardHeading heading="Headers" subHeading="Please provide the CORS headers" />}>
        <S.AddButton>Add a new header</S.AddButton>
        <S.Divider />
        <S.CardActions>
          <Typography.Text type="secondary">
            Learn more about&nbsp;
            <Typography.Link href="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors" target="_blank">
              Origins
            </Typography.Link>
          </Typography.Text>
          <S.SaveButton>Save</S.SaveButton>
        </S.CardActions>
      </Card>
    </S.Container>
  );
};
export default CORS;
