import {useState} from 'react';

import {Button, Input} from 'antd';

import * as S from './styled';

interface IProps {
  addServerHandler: (url: string) => void;
}

const AddServerModal: React.FC<IProps> = props => {
  const {addServerHandler} = props;

  const [serverURL, setServerURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onCancelHandler = () => {
    setServerURL('');
    setShowModal(false);
  };

  const onOkHandler = () => {
    addServerHandler(serverURL);
    setShowModal(false);
  };

  return (
    <S.Container>
      <Button type="primary" onClick={() => setShowModal(true)}>
        Add server
      </Button>

      {showModal && (
        <S.Modal
          destroyOnClose
          centered
          title="Add new server"
          visible={showModal}
          onCancel={onCancelHandler}
          onOk={onOkHandler}
        >
          <S.InputLabel htmlFor="serverURL">Server URL</S.InputLabel>
          <Input
            id="serverURL"
            placeholder="https://api-endpoint.com"
            value={serverURL}
            onChange={e => setServerURL(e.target.value)}
          />
        </S.Modal>
      )}
    </S.Container>
  );
};

export default AddServerModal;
