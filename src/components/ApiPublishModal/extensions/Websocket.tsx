import {useEffect} from 'react';

import {Form, Switch, Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

const Websocket = (): JSX.Element => {
  const form = Form.useFormInstance();
  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi || {});

  useEffect(() => {
    const websocket = openApiSpec['x-kusk'].websocket;

    if (!websocket) {
      return;
    }

    form.setFieldsValue({websocket});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openApiSpec]);

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
