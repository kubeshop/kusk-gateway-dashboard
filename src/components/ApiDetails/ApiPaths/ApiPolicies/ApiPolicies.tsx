import {useState} from 'react';

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
} from '@components/Policies';

import Policies from './Policies';

import * as S from './styled';

const ApiPolicies = () => {
  const [activePolicy, setActivePolicy] = useState<string | undefined>();

  const onCancelClickHandler = () => {
    setActivePolicy(undefined);
  };

  const onFinishClickHandler = () => {};

  return (
    <S.Container>
      <PathNavigator />
      <div style={{width: '100%'}}>
        {!activePolicy && <Policies selectPolicy={setActivePolicy} />}
        {activePolicy === 'cors' && <CORSPolicy onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />}
        {activePolicy === 'rateLimiting' && (
          <RateLimitingPolicy onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
        )}
        {activePolicy === 'routing' && <TargetsPolicy />}
        {activePolicy === 'validation' && (
          <ValidationPolicy onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
        )}
        {activePolicy === 'qos' && <QOSPolicy onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />}
        {activePolicy === 'authentication' && (
          <AuthenticationPolicy onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
        )}
        {activePolicy === 'mocking' && (
          <MockingPolicy onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
        )}
        {activePolicy === 'caching' && (
          <CachingPolicy onCancel={onCancelClickHandler} onFinish={onFinishClickHandler} />
        )}
      </div>
    </S.Container>
  );
};
export default ApiPolicies;
