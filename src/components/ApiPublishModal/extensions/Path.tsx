import {Form, Typography} from 'antd';

import * as S from './styled';

const Path = (): JSX.Element => {
  return (
    <Form.Item
      label={
        <S.LabelContainer>
          <Typography.Text>API Prefix</Typography.Text>
          <Typography.Link href="https://kubeshop.github.io/kusk-gateway/reference/extension/#path" target="_blank">
            learn more
            <S.InfoLinkIcon height={15} width={15} />
          </Typography.Link>
        </S.LabelContainer>
      }
      name={['path', 'prefix']}
    >
      <S.Input placeholder="Prefix for the route ex: /api/" />
    </Form.Item>
  );
};

export default Path;
