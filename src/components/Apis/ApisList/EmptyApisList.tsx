import {Typography} from 'antd';

import Icon from '@ant-design/icons';

import {useAppDispatch} from '@redux/hooks';
import {openApiPublishModal} from '@redux/reducers/ui';

import {RawExternalIcon} from '@components/AntdCustomIcons';

import DashboardImg from '@assets/emptydashboard.svg';

import * as S from './EmptyApisList.styled';

const EmptyApisList = () => {
  const dispatch = useAppDispatch();

  const onClickPublishHandler = () => {
    dispatch(openApiPublishModal());
  };

  return (
    <S.Container>
      <img src={DashboardImg} />
      <S.H2>Create your first API gateway in a few easy steps.</S.H2>
      <Typography.Paragraph style={{maxWidth: 375, textAlign: 'center'}}>
        Create your first API, get it deployed and query your endpoints right away!
      </Typography.Paragraph>

      <S.PublishApiButton type="primary" onClick={onClickPublishHandler}>
        Add first API gateway
      </S.PublishApiButton>

      <S.CardGroup>
        <S.Card href="https://kubeshop.github.io/kusk-gateway/guides/mocking/">
          <S.BookOutlinedIcon />
          <S.Text>Learn how to create a mocked API</S.Text>
          <Icon component={RawExternalIcon} />
        </S.Card>

        <S.Card>
          <S.BookOutlinedIcon />
          <S.Text>How to combine mocked returns and your REST APIs in one gateway</S.Text>
          <Icon component={RawExternalIcon} />
        </S.Card>

        <S.Card>
          <S.BookOutlinedIcon />
          <S.Text>Modern REST API design 101</S.Text>
          <Icon component={RawExternalIcon} />
        </S.Card>

        <S.Card href="https://kubeshop.github.io/kusk-gateway/getting-started/deploy-an-api/">
          <S.BookOutlinedIcon />
          <S.Text>New to OpenAPI? Here’s a great guide to get you started</S.Text>
          <Icon component={RawExternalIcon} />
        </S.Card>
      </S.CardGroup>

      <S.Card href="https://discord.com/invite/6zupCZFQbe">
        <S.QuestionCircleOutlinedIcon />
        <S.Text>
          Need help getting started? Want to talk to kusk engineers?&nbsp;
          <S.TextBlue>Find us on Discord</S.TextBlue>
        </S.Text>
      </S.Card>
    </S.Container>
  );
};

export default EmptyApisList;
