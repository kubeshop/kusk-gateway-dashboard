import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Key} from 'antd/lib/table/interface';

import _ from 'lodash';

import {useAppSelector} from '@redux/hooks';
import {updateApiSettings} from '@redux/reducers/main';

import {PathNavigator} from '@components/PathNavigator';
import {
  AuthenticationPolicy,
  CORSPolicy,
  CachingPolicy,
  MockingPolicy,
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
  const dispatch = useDispatch();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);

  const [activePolicy, setActivePolicy] = useState<string | undefined>();
  const [selectedKeys, setSelectedKeys] = useState<Key[]>(['.']);
  const selectedKey = selectedKeys[0].toString();
  const selectedXKusk = _.get(selectedAPIOpenSpec, selectedKey === '.' ? 'x-kusk' : `${selectedKey}.x-kusk`);

  const onCancelClickHandler = () => {
    setActivePolicy(undefined);
  };

  const onFinishClickHandler = (values: any) => {
    const targetPath = selectedKey === '.' ? ['x-kusk'] : `${selectedKey}.x-kusk`;

    const edit = _.set(_.cloneDeep(selectedAPIOpenSpec), targetPath, values['x-kusk']);
    dispatch(updateApiSettings({editedOpenapi: edit}));
  };

  const onHidePathClickHandler = (p: string, hide: boolean) => {
    const edit = {paths: {[p]: {'x-kusk': {disable: hide}}}};
    dispatch(updateApiSettings({editedOpenapi: edit}));
  };

  useEffect(() => {
    setActivePolicy(undefined);
  }, [selectedKey]);

  return (
    <S.Container>
      <PathNavigator selectedKeys={selectedKeys} selectKey={setSelectedKeys} onHidePath={onHidePathClickHandler} />
      {!activePolicy ? (
        <PoliciesList selectedPath={selectedKey} xkusk={selectedXKusk} selectPolicy={setActivePolicy} />
      ) : (
        <div style={{width: '100%'}} key={selectedKey}>
          {activePolicy === 'grid' && <Policies selectPolicy={setActivePolicy} />}
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
          {activePolicy === 'authentication' && (
            <AuthenticationPolicy
              xKusk={selectedXKusk}
              onCancel={onCancelClickHandler}
              onFinish={onFinishClickHandler}
            />
          )}

          {activePolicy === 'websocket' && (
            <WebsocketPolicy xKusk={selectedXKusk} onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
          )}
          {activePolicy === 'mocking' && (
            <MockingPolicy xKusk={selectedXKusk} onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
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
