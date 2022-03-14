import CollapseExpandOperationsActionButton from './CollapseExpandOperationsActionButton';

import * as S from './styled';

const CollapseExpandOperationsPlugin = (system: any) => ({
  wrapComponents: {
    operations: (Original: any) => (props: any) => {
      console.log(props);

      return (
        <S.CollapseExpandOperationsPluginContainer>
          <Original {...props} />

          <CollapseExpandOperationsActionButton />
        </S.CollapseExpandOperationsPluginContainer>
      );
    },
  },
});

export default CollapseExpandOperationsPlugin;
