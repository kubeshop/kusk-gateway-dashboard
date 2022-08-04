import {Typography} from 'antd';

import Icon from '@ant-design/icons';

import {RawExternalIcon} from '@components/Icons';

import ApiDownImage from '@assets/apidown.svg';

import * as S from './KuskApisDown.styled';

const KuskApisDown = () => {
  return (
    <S.Container>
      <img src={ApiDownImage} />
      <S.H2>Well... this is weird...</S.H2>
      <Typography.Paragraph style={{maxWidth: 375, textAlign: 'center'}}>
        Your kusk API instance seems to be down.Did you try some of the following?
      </Typography.Paragraph>

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

export default KuskApisDown;
