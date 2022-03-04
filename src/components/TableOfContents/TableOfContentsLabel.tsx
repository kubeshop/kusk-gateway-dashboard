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
  operation?: string;
  tag?: string;
}

const TableOfContentsLabel: React.FC<IProps> = props => {
  const {containsKuskExtension, level, path} = props;
  const {deprecated = false, operation = '', tag = ''} = props;

  const onTagClickHandler = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation();
      const tagId = `operations-tag-${tag}`;

      document.getElementById(tagId)?.scrollIntoView({behavior: 'smooth'});
    },
    [tag]
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
          <S.ApiOutlined />
        </Tooltip>
      )}
    </S.Container>
  );
};

export default TableOfContentsLabel;
