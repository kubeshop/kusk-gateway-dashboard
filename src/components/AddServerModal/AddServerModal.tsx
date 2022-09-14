import {useState} from 'react';

import {Input, Modal} from 'antd';

import * as S from './styled';

interface IProps {
  servers: {url: string; description: string}[];
  addServerHandler: (url: string) => void;
}

const AddServerModal: React.FC<IProps> = props => {
  const {servers, addServerHandler} = props;

  const [errorMessage, setErrorMessage] = useState('');
  const [serverURL, setServerURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onCancelHandler = () => {
    setServerURL('');
    setShowModal(false);
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage) {
      setErrorMessage('');
    }

    setServerURL(e.target.value);
  };

  const onOkHandler = () => {
    if (!serverURL) {
      setErrorMessage('Server URL must not be empty!');
      return;
    }

    if (servers?.find(server => server.url === serverURL)) {
      setErrorMessage('Server already exists!');
      return;
    }

    addServerHandler(serverURL);
    setServerURL('');
    setShowModal(false);
  };

  return (
    <>
      <S.Button type="primary" onClick={() => setShowModal(true)}>
        Add server
      </S.Button>

      {showModal && (
        <Modal
          destroyOnClose
          centered
          title="Add new server"
          visible={showModal}
          onCancel={onCancelHandler}
          onOk={onOkHandler}
        >
          <S.InputLabel htmlFor="serverURL">
            Server URL
            <a
              href="https://swagger.io/docs/specification/api-host-and-base-path/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <S.QuestionCircleOutlined />
            </a>
          </S.InputLabel>
          <Input
            id="serverURL"
            placeholder="https://api-endpoint.com"
            value={serverURL}
            onChange={onInputChangeHandler}
          />
          {errorMessage && <S.ErrorMessage>* {errorMessage}</S.ErrorMessage>}
        </Modal>
      )}
    </>
  );
};

export default AddServerModal;
