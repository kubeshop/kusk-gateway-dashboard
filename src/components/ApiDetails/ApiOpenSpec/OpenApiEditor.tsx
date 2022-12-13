import {Suspense, lazy} from 'react';
import {useDispatch} from 'react-redux';

import {Tooltip} from 'antd';

import Icon from '@ant-design/icons';

import {TOOLTIP_DELAY} from '@constants/constants';

import {AlertEnum} from '@models/alert';

import {useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';

import {ApiDefinition} from '@components/ApiDefinition';
import {RawExternalIcon} from '@components/Icons';

import * as S from './OpenApiEditor.styled';

const Monaco = lazy(() => import('@components/Monaco/Monaco'));

const OpenApiEditor = () => {
  const dispatch = useDispatch();
  const selectedAPI = useAppSelector(state => state.main.selectedApi);
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
      <S.Row>
        <S.Title level={3}>Open API Spec</S.Title>

        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="bottom" title="Copy to clipboard">
          <S.CopyYamlButton onClick={onClipboardClick} />
        </Tooltip>
      </S.Row>

      {selectedAPI?.crunch42url && (
        <S.Row>
          <S.ReportLabel>Security Audit Score </S.ReportLabel>
          <S.ReportLink href={selectedAPI?.crunch42url} target="_blank">
            View report
            <Icon component={RawExternalIcon} />
          </S.ReportLink>
        </S.Row>
      )}

      <S.EditorContainer>
        <Suspense fallback={null}>
          <Monaco openapi={selectedAPIOpenSpec} />
        </Suspense>
      </S.EditorContainer>
      <S.RightPane>
        <ApiDefinition />
      </S.RightPane>
    </S.Container>
  );
};

export default OpenApiEditor;
