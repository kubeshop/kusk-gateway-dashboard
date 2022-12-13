import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSearchParams} from 'react-router-dom';

import {Key} from 'antd/lib/table/interface';

import _ from 'lodash';

import {useAppSelector} from '@redux/hooks';
import {updateApiSettings} from '@redux/reducers/main';

import {PathNavigator} from '@components/PathNavigator';
import {
  AuthenticationPolicy,
  CORSPolicy,
  CachingPolicy,
  CrunchSecurityPolicy,
  JWTAuthenticationPolicy,
  QOSPolicy,
  RateLimitingPolicy,
  TargetsPolicy,
  ValidationPolicy,
  WebsocketPolicy,
} from '@components/Policies';

import Policies from './Policies';
import PoliciesList from './PoliciesList';

import * as S from './styled';

const ApiPolicies = () => {
  let [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const queryPath = searchParams.get('p');
  const [activePolicy, setActivePolicy] = useState<string | undefined>();
  const [selectedKeys, setSelectedKeys] = useState<Key[]>(
    searchParams.get('p') ? [searchParams.get('p')?.toString() as Key] : ['.']
  );
  const selectedKey = selectedKeys[0].toString();
  const selectedXKusk = _.get(selectedAPIOpenSpec, selectedKey === '.' ? 'x-kusk' : `${selectedKey}.x-kusk`);
  const isRootPath = selectedKey === '.';

  const onCancelClickHandler = () => {
    setActivePolicy(undefined);
  };

  const onFinishClickHandler = (values: any) => {
    const targetPath = selectedKey === '.' ? ['x-kusk'] : `${selectedKey}.x-kusk`;

    const edit = _.set(_.cloneDeep(selectedAPIOpenSpec), targetPath, values['x-kusk']);
    dispatch(updateApiSettings({editedOpenapi: edit}));
    setActivePolicy(undefined);
  };

  const onHidePathClickHandler = (p: string[], hide: boolean) => {
    const edit = p.reduce((acc, item) => {
      return _.set(acc, item, hide ? {disabled: hide} : {disabled: null});
    }, _.cloneDeep(selectedAPIOpenSpec));

    dispatch(updateApiSettings({editedOpenapi: edit}));
  };

  useEffect(() => {
    setActivePolicy(undefined);
  }, [selectedKey]);

  useEffect(() => {
    if (searchParams.get('p') && selectedKey !== searchParams.get('p')) {
      setSelectedKeys([searchParams.get('p')?.toString() as Key]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryPath]);

  return (
    <S.Container>
      <PathNavigator selectedKeys={selectedKeys} selectKey={setSelectedKeys} onHidePath={onHidePathClickHandler} />
      {!activePolicy ? (
        <PoliciesList selectedPath={selectedKey} xkusk={selectedXKusk} selectPolicy={setActivePolicy} />
      ) : (
        <div style={{width: '100%'}} key={selectedKey}>
          {activePolicy === 'grid' && <Policies selectPolicy={setActivePolicy} isRootPath={isRootPath} />}
          {activePolicy === 'cors' && (
            <CORSPolicy xKusk={selectedXKusk} onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
          )}
          {activePolicy === 'rateLimiting' && (
            <RateLimitingPolicy xKusk={selectedXKusk} onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
          )}
          {activePolicy === 'routing' && (
            <TargetsPolicy xKusk={selectedXKusk} onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
          )}
          {activePolicy === 'validation' && (
            <ValidationPolicy xKusk={selectedXKusk} onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
          )}
          {activePolicy === 'qos' && (
            <QOSPolicy xKusk={selectedXKusk} onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
          )}
          {activePolicy === 'customAuthentication' && (
            <AuthenticationPolicy
              xKusk={selectedXKusk}
              onCancel={onCancelClickHandler}
              onFinish={onFinishClickHandler}
            />
          )}

          {activePolicy === 'jwtAuthentication' && (
            <JWTAuthenticationPolicy
              xKusk={selectedXKusk}
              onCancel={onCancelClickHandler}
              onFinish={onFinishClickHandler}
            />
          )}

          {activePolicy === '42crunch' && (
            <CrunchSecurityPolicy
              xKusk={selectedXKusk}
              onCancel={onCancelClickHandler}
              onFinish={onFinishClickHandler}
            />
          )}

          {activePolicy === 'websocket' && (
            <WebsocketPolicy xKusk={selectedXKusk} onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
          )}

          {activePolicy === 'caching' && (
            <CachingPolicy xKusk={selectedXKusk} onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
          )}
        </div>
      )}
    </S.Container>
  );
};
export default ApiPolicies;
