import {Typography} from 'antd';

import {useAppDispatch} from '@redux/hooks';
import {openStaticRouteModal} from '@redux/reducers/ui';

import {SubHeading} from '@components/AntdCustom';
import {DiscordCard} from '@components/HelpCard';

import EmptyImg from '@assets/emptyStaticroute.svg';

import * as S from './EmptyList.styled';

const EmptyList = () => {
  const dispatch = useAppDispatch();

  const onClickPublishHandler = () => {
    dispatch(openStaticRouteModal());
  };

  return (
    <S.Container>
      <img src={EmptyImg} />
      <S.H2>Create a Static Route in a few easy steps.</S.H2>
      <SubHeading style={{maxWidth: 290, textAlign: 'center'}}>
        Define manually configured routing rules. Learn more about?&nbsp;
        <Typography.Link href="https://docs.kusk.io/reference/customresources/staticroute" target="_blank">
          Static Routes.
        </Typography.Link>
      </SubHeading>

      <S.CTAButton type="primary" onClick={onClickPublishHandler}>
        Add static route
      </S.CTAButton>

      <DiscordCard />
    </S.Container>
  );
};

export default EmptyList;
