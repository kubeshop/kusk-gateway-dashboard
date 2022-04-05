import {Modal} from 'antd';

import {useAppDispatch} from '@redux/hooks';
import {closeApiDeployModal} from '@redux/reducers/ui';

import * as S from './styled';

const ApiDeployModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const onCancelHandler = () => dispatch(closeApiDeployModal());

  return (
    <Modal visible title="Deploy New API" width="800px" onCancel={onCancelHandler}>
      <S.Container>Test</S.Container>
    </Modal>
  );
};

export default ApiDeployModal;
