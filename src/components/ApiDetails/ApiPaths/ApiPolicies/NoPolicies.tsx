import {Typography} from 'antd';

import {SubHeading} from '@components/AntdCustom';

import PoliciesLogo from '@assets/PoliciesLogo.svg';

import * as S from './NoPolicies.styled';

const NoPolicies = () => {
  return (
    <S.Container>
      <S.Img src={PoliciesLogo} />
      <Typography.Title>This API doesn’t have any policies added.</Typography.Title>
      <SubHeading>
        Select the root? level, path or method from the left menu to add a policy. Learn more about &nbsp;
        <Typography.Link href="https://docs.kusk.io/guides/working-with-extension/#properties-overview" target="_blank">
          Policies.
        </Typography.Link>
      </SubHeading>
    </S.Container>
  );
};

export default NoPolicies;
