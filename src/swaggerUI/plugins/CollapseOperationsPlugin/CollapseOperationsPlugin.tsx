import * as S from './styled';

const CollapseOperationsPlugin = (system: any) => ({
  wrapComponents: {
    operations: (Original: any) => (props: any) => {
      return (
        <S.CollapseExpandOperationsPluginContainer>
          <Original {...props} />

          <S.CollapseOperationsButton>Collapse all</S.CollapseOperationsButton>
        </S.CollapseExpandOperationsPluginContainer>
      );
    },
  },
});

export default CollapseOperationsPlugin;
