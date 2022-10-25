import {useDispatch} from 'react-redux';

import {Card, Modal, Typography} from 'antd';

import {closeApiPublishModal, openCanvasApiModal, openFileApiModal, setApiCanvasType} from '@redux/reducers/ui';

import apiBlankCanvas from '@assets/apiBlankCanvas.svg';
import ApiImportFile from '@assets/apiImportFile.svg';
import ApiTemplate from '@assets/apiTemplate.svg';

import * as S from './ApiCreatorModal.styled';

const ApiCreatorModal = () => {
  const dispatch = useDispatch();

  const onBackHandler = () => {
    dispatch(closeApiPublishModal());
  };

  const onTemplateClickHandler = () => {
    dispatch(setApiCanvasType('template'));
    dispatch(openCanvasApiModal());
  };

  const onFileClickHandler = () => {
    dispatch(openFileApiModal());
  };

  const onBlankClickHandler = () => {
    dispatch(setApiCanvasType('blank'));
    dispatch(openCanvasApiModal());
  };

  return (
    <Modal open width="608px" footer={null} title="Create an API" onCancel={onBackHandler}>
      <S.Heading type="secondary">Select how you’d like to create your API</S.Heading>
      <S.Grid>
        <S.Card hoverable cover={<img src={ApiTemplate} />} onClick={onTemplateClickHandler}>
          <Card.Meta
            title="ToDo App Template"
            description={
              <Typography.Text type="secondary">Use this template as a quick starter to explore</Typography.Text>
            }
          />
        </S.Card>

        <S.Card hoverable cover={<img src={ApiImportFile} />} onClick={onFileClickHandler}>
          <Card.Meta
            title="Select from file"
            description={<Typography.Text type="secondary">Import your OpenAPI spec from file or URL</Typography.Text>}
          />
        </S.Card>

        <S.Card hoverable cover={<img src={apiBlankCanvas} />} onClick={onBlankClickHandler}>
          <Card.Meta
            title="Blank canvas"
            description={<Typography.Text type="secondary">Add your API based on your OpenAPI spec</Typography.Text>}
          />
        </S.Card>
      </S.Grid>
    </Modal>
  );
};

export default ApiCreatorModal;
