import {Typography} from 'antd';

import {DiscordCard, HelpCard, HelpCardGroup} from '@components/HelpCard';

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

      <HelpCardGroup>
        <HelpCard
          title="Learn how to create a mocked API"
          link="https://kubeshop.github.io/kusk-gateway/guides/mocking/"
        />

        <HelpCard
          title="How to combine mocked returns and your REST APIs in one gateway"
          link="https://docs.kusk.io/"
        />

        <HelpCard title="Modern REST API design 101" link="https://docs.kusk.io/" />

        <HelpCard
          title="New to OpenAPI? Here’s a great guide to get you started"
          link="https://kubeshop.github.io/kusk-gateway/getting-started/deploy-an-api/"
        />
      </HelpCardGroup>
      <DiscordCard />
    </S.Container>
  );
};

export default KuskApisDown;
