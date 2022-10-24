import {Typography} from 'antd';

import {AppRoutes} from '@constants/AppRoutes';

import {SubHeading} from '@components/AntdCustom';
import {DiscordCard, HelpCard, HelpCardGroup} from '@components/HelpCard';

import ApiDownImage from '@assets/apidown.svg';

import * as S from './KuskApisDown.styled';

const KuskApisDown = () => {
  return (
    <S.Container>
      <img src={ApiDownImage} />
      <S.H2>Your Kusk API instance seems to be down.</S.H2>

      <S.Heading>
        <SubHeading>Your Kusk API endpoint may be incorrectly configured.</SubHeading>
        <br />
        <SubHeading>
          To try and resolve the issue, please edit the endpoint in&nbsp;
          <Typography.Link href={AppRoutes.APP_SETTINGS}>Settings</Typography.Link> and ensure that it is accessible
          from the browser.
        </SubHeading>
      </S.Heading>

      <HelpCardGroup style={{marginTop: 36}}>
        <HelpCard
          title="How to install and run Kusk and it’s dashboard"
          link="https://docs.kusk.io/reference/dashboard/overview"
        />
        <DiscordCard />
      </HelpCardGroup>
    </S.Container>
  );
};

export default KuskApisDown;
