import {Form, Switch, Typography} from 'antd';

import * as S from './styled';

const Websocket = (): JSX.Element => {
  return (
    <Form.Item
      label={
        <S.LabelContainer>
          <Typography.Text>Websocket</Typography.Text>
          <Typography.Link
            href="https://kubeshop.github.io/kusk-gateway/reference/extension/#websocket"
            target="_blank"
          >
            learn more
            <S.InfoLinkIcon height={15} width={15} />
          </Typography.Link>
        </S.LabelContainer>
      }
      name="websocket"
      valuePropName="checked"
    >
      <Switch />
    </Form.Item>
  );
};

export default Websocket;
