import {Dispatch, SetStateAction} from 'react';
import {useDispatch} from 'react-redux';

import {Button, Typography} from 'antd';

import _ from 'lodash';

import {useAppSelector} from '@redux/hooks';
import {updateApiSettings} from '@redux/reducers/main';

import {MethodTag, SubHeading, TargetTag} from '@components/AntdCustom';

import * as S from './PoliciesList.styled';

interface IProps {
  selectedPath: string;
  xkusk: {[key: string]: any};
  selectPolicy: Dispatch<SetStateAction<string | undefined>>;
}

const routingPolicies = ['mocking', 'redirect', 'upstream'];

const PoliciesList = ({selectedPath, xkusk, selectPolicy}: IProps) => {
  const dispatch = useDispatch();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);

  const policies = Object.keys(xkusk || {}).sort(a => (routingPolicies.includes(a) ? -1 : 0));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_1, path, operation] = selectedPath.split('.');
  const displayPath = selectedPath === '.' ? 'Root' : path;

  const onAddPolicyClickHandler = () => {
    selectPolicy('grid');
  };

  const onDeletePolicyClickHandler = (policy: string) => {
    const targetPath = selectedPath === '.' ? `x-kusk.${policy}` : `${selectedPath}.x-kusk.${policy}`;
    const edit = _.update(_.cloneDeep(selectedAPIOpenSpec), targetPath, () => null);
    dispatch(updateApiSettings({editedOpenapi: edit}));
  };

  const onEditPolicyClickHandler = (policy: string) => {
    if (policy === 'cors') {
      selectPolicy('cors');
    } else if (policy === 'qos') {
      selectPolicy('qos');
    } else if (policy === 'rate_limit') {
      selectPolicy('rateLimiting');
    } else if (policy === 'validation') {
      selectPolicy('validation');
    } else if (policy === 'auth') {
      selectPolicy('authentication');
    } else if (policy === 'websocket') {
      selectPolicy('websocket');
    } else if (policy === 'cache') {
      selectPolicy('caching');
    } else if (policy === 'mocking' || policy === 'upstream' || policy === 'redirect') {
      selectPolicy('routing');
    }
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.Path>{displayPath}</S.Path>
          {operation && <MethodTag $method={operation}>{operation}</MethodTag>}
        </div>
        <Button type="primary" onClick={onAddPolicyClickHandler}>
          Add policy
        </Button>
      </S.Header>
      {!xkusk && (
        <SubHeading>
          Add a policy for this path. <Typography.Text>Note:</Typography.Text> Policies applied at the path level will
          override those at the root level.
        </SubHeading>
      )}
      {Boolean(policies.length) &&
        policies.map(policy => {
          const targetType =
            policy === 'mocking'
              ? 'mocked'
              : policy === 'redirect'
              ? 'redirect'
              : _.has(xkusk, 'upstream.service')
              ? 'service'
              : 'host';

          return (
            <S.PolicyChip key={policy}>
              <div>
                <S.Title>{getPolicyDisplayName(policy)}</S.Title>
                {routingPolicies.includes(policy) && <TargetTag $type={targetType}>{targetType}</TargetTag>}
              </div>
              <div>
                <Button type="link" onClick={() => onEditPolicyClickHandler(policy)}>
                  Edit
                </Button>
                {!disabledRootRoutingPolicy(policy, selectedPath) && (
                  <Button type="link" onClick={() => onDeletePolicyClickHandler(policy)}>
                    Delete
                  </Button>
                )}
              </div>
            </S.PolicyChip>
          );
        })}
    </S.Container>
  );
};

const getPolicyDisplayName = (policy: string) => {
  switch (policy) {
    case 'cors':
      return 'CORS';
    case 'rate_limit':
      return 'Rate Limiting';
    case 'validation':
      return 'Validation';
    case 'qos':
      return 'QoS';
    case 'auth':
      return 'Authentication';
    case 'websocket':
      return 'Websocket';
    case 'cache':
      return 'Caching';
    case 'upstream':
      return 'Routing';
    case 'redirect':
      return 'Routing';
    case 'mocking':
      return 'Routing';
    default:
      return '';
  }
};

const disabledRootRoutingPolicy = (policy: string, path: string) => {
  return path === '.' && routingPolicies.includes(policy);
};

export default PoliciesList;
