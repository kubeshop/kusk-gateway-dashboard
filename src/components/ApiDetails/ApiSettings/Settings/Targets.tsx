import {useState} from 'react';

import {Button, Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';

import {AddTargetModal} from './AddTargetModal';
import {TargetCard} from './Target';

import * as S from './styled';

const Targets = () => {
  const [showAddTargetModal, setShowAddTargetModal] = useState(false);
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];
  const hasTarget = Boolean(xKusk?.upstream) || Boolean(xKusk?.redirect);

  const onAddTargetClick = () => {
    setShowAddTargetModal(!showAddTargetModal);
  };
  return (
    <S.Container>
      <div>
        <Typography.Title level={5}>Targets</Typography.Title>
        <Typography.Text>
          Define the the upstreams or redirects your API is routing the requests to.&nbsp;
          <Typography.Link href="https://docs.kusk.io/guides/routing" target="_blank">
            Learn more about targets
          </Typography.Link>
        </Typography.Text>
      </div>
      {!hasTarget && (
        <div>
          <Button type="primary" onClick={onAddTargetClick}>
            {hasTarget ? 'Define a new target' : 'Define your first target'}
          </Button>
        </div>
      )}
      {hasTarget && <TargetCard target={xKusk['upstream'] || {redirect: xKusk['redirect']}} />}
      {showAddTargetModal && <AddTargetModal closeModal={() => setShowAddTargetModal(false)} />}
    </S.Container>
  );
};

export default Targets;
