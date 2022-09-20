import {useAppSelector} from '@redux/hooks';

import {KuskExtensions} from '@components/KuskExtensions';
import {Monaco} from '@components/Monaco';

import * as S from './KuskExtension.styled';

const KuskExtension = () => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  return (
    <S.Container>
      <S.Title level={3} style={{marginTop: 20, marginBottom: 20}}>
        Kusk Extensions
      </S.Title>
      <S.EditorContainer>
        <Monaco openapi={selectedAPIOpenSpec} />
      </S.EditorContainer>
      <S.RightPane>
        <KuskExtensions />
      </S.RightPane>
    </S.Container>
  );
};

export default KuskExtension;
