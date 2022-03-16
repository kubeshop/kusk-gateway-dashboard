import {useCallback} from 'react';

import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';
import {KuskExtensionTooltip} from '@constants/tooltips';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setApiInfoActiveTab, setKuskExtensionsActiveKeys} from '@redux/reducers/ui';

import * as S from './TableOfContentsLabel.styled';

interface IProps {
  level: 'top' | 'path' | 'operation';
  path: string;
  deprecated?: boolean;
  kuskExtensionRef?: string;
  operation?: string;
  tag?: string;
}

const TableOfContentsLabel: React.FC<IProps> = props => {
  const {level, path} = props;
  const {deprecated = false, kuskExtensionRef = '', operation = '', tag = ''} = props;

  const dispatch = useAppDispatch();
  const kuskExtensionsActiveKeys = useAppSelector(state => state.ui.kuskExtensionsActiveKeys[level]);

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

      if (!kuskExtensionRef) {
        return;
      }

      dispatch(setApiInfoActiveTab('kusk-extensions'));

      if (!kuskExtensionsActiveKeys.includes(kuskExtensionRef)) {
        dispatch(setKuskExtensionsActiveKeys({keys: [...kuskExtensionsActiveKeys, kuskExtensionRef], level}));
      }

      setTimeout(() => {
        document.getElementById(kuskExtensionRef)?.scrollIntoView({behavior: 'smooth'});
      }, 50);
    },
    [dispatch, kuskExtensionRef, kuskExtensionsActiveKeys, level]
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

      {Boolean(kuskExtensionRef) && (
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} title={KuskExtensionTooltip}>
          <S.ApiOutlined onClick={onKuskExtensionIconClickHandler} />
        </Tooltip>
      )}
    </S.Container>
  );
};

export default TableOfContentsLabel;
