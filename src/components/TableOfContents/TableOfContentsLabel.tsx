import {useCallback} from 'react';

import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';
import {KuskExtensionTooltip} from '@constants/tooltips';

import * as S from './TableOfContentsLabel.styled';

interface IProps {
  containsKuskExtension: boolean;
  level: 'top' | 'path' | 'operation';
  path: string;
  deprecated?: boolean;
  kuskExtensionRef?: string;
  layoutActions?: any;
  operation?: string;
  operationId?: string;
  tag?: string;
}

const TableOfContentsLabel: React.FC<IProps> = props => {
  const {containsKuskExtension, layoutActions, level, path} = props;
  const {deprecated = false, kuskExtensionRef = '', operation = '', operationId = '', tag = ''} = props;

  const onTagClickHandler = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation();
      const tagId = `operations-tag-${tag}`;

      document.getElementById(tagId)?.scrollIntoView({behavior: 'smooth'});
    },
    [tag]
  );

  const onKuskExtensionIconClickHandler = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation();

      if (!kuskExtensionRef || !layoutActions) {
        return;
      }

      // if operation expanded, scroll to operation summary
      if (document.getElementById(kuskExtensionRef)?.classList.contains('is-open')) {
        document.getElementById(kuskExtensionRef)?.scrollIntoView({behavior: 'smooth'});
      } else {
        // expand the operation and the scroll to operation summary
        layoutActions.show(['operations', tag || 'default', operationId], true);

        setTimeout(() => {
          document.getElementById(kuskExtensionRef)?.scrollIntoView({behavior: 'smooth'});
        }, 200);
      }
    },
    [kuskExtensionRef, layoutActions, operationId, tag]
  );

  return (
    <S.Container $level={level}>
      {level === 'operation' && <S.LabelTag onClick={onTagClickHandler}>{tag}</S.LabelTag>}

      <S.LabelPath $deprecated={deprecated}>{path}</S.LabelPath>

      {level === 'operation' && (
        <S.LabelMethodTag $deprecated={deprecated} $method={operation}>
          {operation.toUpperCase()}
        </S.LabelMethodTag>
      )}

      {containsKuskExtension && (
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={KuskExtensionTooltip}>
          <S.ApiOutlined onClick={onKuskExtensionIconClickHandler} />
        </Tooltip>
      )}
    </S.Container>
  );
};

export default TableOfContentsLabel;
