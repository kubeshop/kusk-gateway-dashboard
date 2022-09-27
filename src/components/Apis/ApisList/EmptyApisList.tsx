import {useAppDispatch} from '@redux/hooks';
import {openApiPublishModal} from '@redux/reducers/ui';

import {SubHeading} from '@components/AntdCustom';
import {DiscordCard, HelpCard, HelpCardGroup} from '@components/HelpCard';

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
      <S.H2>Create your first API in a few easy steps.</S.H2>
      <SubHeading style={{maxWidth: 290, textAlign: 'center'}}>
        Create your first API, get it deployed and query your endpoints right away!
      </SubHeading>

      <S.PublishApiButton type="primary" onClick={onClickPublishHandler}>
        Create first API
      </S.PublishApiButton>

      <HelpCardGroup>
        <HelpCard
          title="Learn how to create a mocked API"
          link="https://kubeshop.github.io/kusk-gateway/guides/mocking/"
        />

        <HelpCard
          title="How to combine mocked returns and your REST APIs in one gateway"
          link="https://kubeshop.github.io/kusk-gateway/getting-started/deploy-an-api/"
        />

        <HelpCard
          title="Modern REST API design 101"
          link="https://kubeshop.github.io/kusk-gateway/getting-started/deploy-an-api/"
        />

        <HelpCard
          title="New to OpenAPI? Here’s a great guide to get you started"
          link="https://kubeshop.github.io/kusk-gateway/getting-started/deploy-an-api/"
        />
      </HelpCardGroup>
      <DiscordCard />
    </S.Container>
  );
};

export default EmptyApisList;
