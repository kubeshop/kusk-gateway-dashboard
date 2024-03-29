import Icon from '@ant-design/icons';

import {KUSK_DOCS} from '@constants/constants';

import {RawExternalIcon} from '@components/Icons';

import * as S from './styled';

export const HelpCard = ({title, link = KUSK_DOCS}: {title: string; link?: string}) => {
  return (
    <S.Card href={link}>
      <S.BookOutlinedIcon />
      <S.Text>{title}</S.Text>
      <Icon component={RawExternalIcon} />
    </S.Card>
  );
};

export const DiscordCard = () => {
  return (
    <S.Card href="https://discord.com/invite/6zupCZFQbe">
      <S.QuestionCircleOutlinedIcon />
      <S.Text>
        Need help getting started? Want to talk to kusk engineers?&nbsp;
        <S.TextBlue>Find us on Discord</S.TextBlue>
      </S.Text>
    </S.Card>
  );
};
