import {useDispatch} from 'react-redux';

import {Card, Modal} from 'antd';

import {closeApiPublishModal, openCanvasApiModal, setApiCanvasType} from '@redux/reducers/ui';

import apiBlankCanvas from '../../assets/apiBlankCanvas.svg';
import ApiTemplate from '../../assets/apiTemplate.svg';
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

  const onBlankClickHandler = () => {
    dispatch(setApiCanvasType('blank'));
    dispatch(openCanvasApiModal());
  };

  return (
    <Modal visible footer={null} title="Create an API" onCancel={onBackHandler}>
      <S.Heading type="secondary">Select how you’d like to create your API</S.Heading>
      <S.Grid>
        <S.Card hoverable cover={<img src={ApiTemplate} />} onClick={onTemplateClickHandler}>
          <Card.Meta title="ToDo App Template" description="Use this template as a quick starter to explore" />
        </S.Card>

        <S.Card hoverable cover={<img src={apiBlankCanvas} />} onClick={onBlankClickHandler}>
          <Card.Meta title="Blank canvas" description="Add your API based on your OpenAPI spec" />
        </S.Card>
      </S.Grid>
    </Modal>
  );
};

export default ApiCreatorModal;
