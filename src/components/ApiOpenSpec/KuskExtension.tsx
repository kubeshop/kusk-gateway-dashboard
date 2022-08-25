import {Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';

import {KuskExtensions} from '@components/KuskExtensions';
import {Monaco} from '@components/Monaco';

import * as S from './styled';

const KuskExtension = () => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  return (
    <>
      <Typography.Title level={3} style={{marginTop: 32}}>
        Kusk Extensions
      </Typography.Title>

      <Monaco openapi={selectedAPIOpenSpec} />

      <S.RightPane>
        <KuskExtensions />
      </S.RightPane>
    </>
  );
};

export default KuskExtension;
