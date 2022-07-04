import {Form, Switch, Typography} from 'antd';

import * as S from './styled';

const Validation = (): JSX.Element => {
  const isApiMocked = Form.useWatch(['mocking', 'enabled']);

  return (
    <Form.Item
      label={
        <S.LabelContainer>
          <Typography.Text>Request validation</Typography.Text>
          <Typography.Link
            href="https://kubeshop.github.io/kusk-gateway/reference/extension/#validation"
            target="_blank"
          >
            learn more
            <S.InfoLinkIcon height={15} width={15} />
          </Typography.Link>
        </S.LabelContainer>
      }
      name={['validation', 'request', 'enabled']}
      valuePropName="checked"
    >
      <Switch disabled={isApiMocked} />
    </Form.Item>
  );
};

export default Validation;
