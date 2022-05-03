import {getOperationId} from '@swaggerUI/utils/operations';

import * as S from './styled';

const CollapseOperationsPlugin = () => ({
  wrapComponents: {
    operations: (Original: any) => (props: any) => {
      const {layoutActions, layoutSelectors, specSelectors} = props;

      const closeAllOperationsHandler = () => {
        const operations = specSelectors.operations().toJS();
        operations.forEach((op: any) => {
          const {method, path, operation} = op;

          const operationId = getOperationId(path, method, operation);
          const tags = operation.tags || ['default'];

          tags.forEach((tag: string) => {
            const isShownKey = ['operations', tag, operationId];

            if (layoutSelectors.isShown(isShownKey)) {
              layoutActions.show(isShownKey, false);
            }
          });
        });
      };

      return (
        <S.CollapseExpandOperationsPluginContainer>
          <Original {...props} />

          <S.CollapseOperationsButton type="default" onClick={closeAllOperationsHandler}>
            Collapse all
          </S.CollapseOperationsButton>
        </S.CollapseExpandOperationsPluginContainer>
      );
    },
  },
});

export default CollapseOperationsPlugin;
