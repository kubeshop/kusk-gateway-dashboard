import {Button, Typography} from 'antd';

import * as S from './styled';

const Targets = () => {
  const targets: Array<{}> = [];
  return (
    <S.Container>
      <div>
        <Typography.Title level={5}>Targets</Typography.Title>
        <Typography.Text>
          Define the the upstreams or redirects your API is routing the requests to.&nbsp;
          <Typography.Link href="https://kubeshop.github.io/kusk-gateway/reference/extension/#upstream" target="_blank">
            Learn more about targets
          </Typography.Link>
        </Typography.Text>
      </div>
      <div>
        <Button type="primary">{targets.length === 0 ? 'Define your first target' : 'Define a new target'}</Button>
      </div>
    </S.Container>
  );
};

export default Targets;
