import {useEffect} from 'react';

import {Form, Switch, Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

const Validation = (): JSX.Element => {
  const form = Form.useFormInstance();
  const isApiMocked = Form.useWatch(['mocking', 'enabled']);
  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi || {});

  useEffect(() => {
    const validation = openApiSpec['x-kusk'].validation;

    if (!validation) {
      return;
    }

    if (isApiMocked) {
      form.resetFields();
    } else {
      form.setFieldsValue({validation});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApiMocked, openApiSpec]);

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
