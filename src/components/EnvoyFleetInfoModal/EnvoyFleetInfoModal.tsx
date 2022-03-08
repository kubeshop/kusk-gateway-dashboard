import {useMemo} from 'react';

import {Button, Modal, Skeleton} from 'antd';

import {useGetEnvoyFleet} from '@models/api';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {toggleEnvoyFleetInfoModal} from '@redux/reducers/ui';

import * as S from './styled';

const EnvoyFleetInfoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const envoyFleet = useAppSelector(state => state.ui.envoyFleetModal.envoyFleet);

  const isModalVisible = useMemo(() => Boolean(envoyFleet), [envoyFleet]);

  const {data, error, loading} = useGetEnvoyFleet({
    name: envoyFleet?.name || '',
    namespace: envoyFleet?.namespace || '',
  });

  const onCancelHandler = () => {
    dispatch(toggleEnvoyFleetInfoModal(null));
  };

  if (!envoyFleet) {
    return null;
  }

  return (
    <Modal
      footer={
        <Button type="primary" onClick={onCancelHandler}>
          Ok
        </Button>
      }
      title="Envoy fleet information"
      visible={isModalVisible}
      onCancel={onCancelHandler}
    >
      {loading ? (
        <Skeleton />
      ) : error ? (
        <span>{error.message}</span>
      ) : (
        data && (
          <S.Table>
            <tbody>
              <tr>
                <S.TableHead>Name</S.TableHead>
                <S.TableData>{envoyFleet.name}</S.TableData>
              </tr>
              <tr>
                <S.TableHead>Namespace</S.TableHead>
                <S.TableData>{envoyFleet.namespace}</S.TableData>
              </tr>
            </tbody>
          </S.Table>
        )
      )}
    </Modal>
  );
};

export default EnvoyFleetInfoModal;
