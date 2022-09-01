import {useDispatch} from 'react-redux';

import {Tooltip} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';

import {AlertEnum} from '@models/alert';

import {useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';

import {ApiDefinition} from '@components/ApiDefinition';
import {Monaco} from '@components/Monaco';

import * as S from './OpenApiEditor.styled';

const OpenApiEditor = () => {
  const dispatch = useDispatch();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const onClipboardClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(JSON.stringify(selectedAPIOpenSpec));
    } else {
      document.execCommand('copy', true, JSON.stringify(selectedAPIOpenSpec));
    }
    dispatch(
      setAlert({
        title: 'Copied to clipboard',
        type: AlertEnum.Success,
      })
    );
  };
  return (
    <S.Container>
      <S.Header>
        <S.Title level={3}>Open API Spec</S.Title>

        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="bottom" title="Copy to clipboard">
          <S.CopyYamlButton onClick={onClipboardClick} />
        </Tooltip>
      </S.Header>
      <S.EditorContainer>
        <Monaco openapi={selectedAPIOpenSpec} />
      </S.EditorContainer>
      <S.RightPane>
        <ApiDefinition />
      </S.RightPane>
    </S.Container>
  );
};

export default OpenApiEditor;
