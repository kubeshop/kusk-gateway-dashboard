import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {Tooltip, Typography} from 'antd';

import {TOOLTIP_DELAY} from '@constants/constants';

import {AlertEnum} from '@models/alert';

import {useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';

import {ApiPathsTable} from './ApiPathsTable';
import {ApiPolicies} from './ApiPolicies';

import * as S from './styled';

const tabs = [
  {
    key: '1',
    label: 'Overview',
    children: <ApiPathsTable />,
  },
  {
    key: '2',
    label: 'Policies',
    children: <ApiPolicies />,
  },
];

const ApiPaths = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {'*': section} = useParams();
  const selectedApi = useAppSelector(state => state.main.selectedApi);
  const devPortalEndpoint = useAppSelector(state => state.main.devPortalEndpoint);

  const portalURL = `${devPortalEndpoint}?name=${selectedApi?.name}&namespace=${selectedApi?.namespace}`;

  const activeKey = section?.endsWith('policies') ? '2' : '1';
  const onTabClickHandler = (key: string) => {
    if (key === '1') {
      navigate('paths/overview');
    } else {
      navigate('paths/policies');
    }
  };

  const onClipboardClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(JSON.stringify(portalURL));
    } else {
      document.execCommand('copy', true, JSON.stringify(portalURL));
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
      <Typography.Title level={1}>Routes</Typography.Title>
      <Typography.Text type="secondary">
        View Developer Portal at&nbsp;
        <Typography.Link target="_blank" href={portalURL}>
          {portalURL}
        </Typography.Link>
        <Tooltip mouseEnterDelay={TOOLTIP_DELAY} placement="bottom" title="Copy to clipboard">
          <S.CopyPortalUrlButton onClick={onClipboardClick} />
        </Tooltip>
      </Typography.Text>
      <S.Tabs items={tabs} activeKey={activeKey} onTabClick={onTabClickHandler} />
    </S.Container>
  );
};

export default ApiPaths;
