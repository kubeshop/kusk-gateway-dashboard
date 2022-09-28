import {Skeleton, Space} from 'antd';

import * as S from './styled';

const ApiSkelton = () => {
  return (
    <S.Container>
      <Space direction="vertical">
        <Skeleton.Button shape="square" active />
        <Skeleton.Button shape="square" active />
        <Skeleton.Button shape="square" active />
        <Skeleton.Button shape="square" active />
      </Space>

      <Space direction="vertical">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </Space>
    </S.Container>
  );
};
export default ApiSkelton;
