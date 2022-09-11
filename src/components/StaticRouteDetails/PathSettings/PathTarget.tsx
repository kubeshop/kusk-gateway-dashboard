import {Button, Typography} from 'antd';

import {SubHeading} from '@components/AntdCustom';

import * as S from './PathTarget.styled';

const PathTarget = () => {
  return (
    <S.Header>
      <SubHeading>
        Define the the upstreams or redirects your API is routing the requests to.&nbsp;
        <Typography.Link href="https://kubeshop.github.io/kusk-gateway/reference/extension/#upstream" target="_blank">
          Learn more
        </Typography.Link>
      </SubHeading>
      <Button type="primary" size="large">
        Add new target
      </Button>
    </S.Header>
  );
};
export default PathTarget;
