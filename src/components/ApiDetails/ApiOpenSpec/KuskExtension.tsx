import {Suspense, lazy} from 'react';

import {useAppSelector} from '@redux/hooks';

import {KuskExtensions} from '@components/KuskExtensions';

import * as S from './KuskExtension.styled';

const Monaco = lazy(() => import('@components/Monaco/Monaco'));

const KuskExtension = () => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  return (
    <S.Container>
      <S.Title level={3} style={{marginTop: 20, marginBottom: 20}}>
        Kusk Extensions
      </S.Title>
      <S.EditorContainer>
        <Suspense fallback={null}>
          <Monaco openapi={selectedAPIOpenSpec} />
        </Suspense>
      </S.EditorContainer>
      <S.RightPane>
        <KuskExtensions />
      </S.RightPane>
    </S.Container>
  );
};

export default KuskExtension;
