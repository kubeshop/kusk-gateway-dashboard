import {useDispatch} from 'react-redux';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

import {Skeleton} from 'antd';

import {CopyOutlined} from '@ant-design/icons';

import {AlertEnum} from '@models/alert';

import {useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {useGetApiCrdQuery} from '@redux/services/enhancedApi';

import {ErrorLabel} from '@components/AntdCustom';

import * as S from './styled';

interface CRD {
  metadata: object;
  spec: {
    fleet: object;
    spec: string;
  };
}

const ApiRawYaml = () => {
  const dispatch = useDispatch();

  const selectedAPI = useAppSelector(state => state.main.selectedApi);

  const {data, error, isLoading} = useGetApiCrdQuery({
    name: selectedAPI?.name || '',
    namespace: selectedAPI?.namespace || '',
  });

  const onClipboardClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(JSON.stringify((data as CRD).spec.spec));
    } else {
      document.execCommand('copy', true, JSON.stringify((data as CRD).spec.spec));
    }
    dispatch(
      setAlert({
        title: 'Copied to clipboard',
        type: AlertEnum.Success,
      })
    );
  };

  return isLoading ? (
    <Skeleton />
  ) : error || !data ? (
    <ErrorLabel>{error}</ErrorLabel>
  ) : (
    <S.Container>
      <S.RawYaml language="yaml" style={atomDark} wrapLines wrapLongLines>
        {(data as CRD).spec.spec}
      </S.RawYaml>
      <S.ClipboardButton type="ghost" ghost icon={<CopyOutlined style={{fontSize: 16}} />} onClick={onClipboardClick}>
        Copy
      </S.ClipboardButton>
    </S.Container>
  );
};

export default ApiRawYaml;
