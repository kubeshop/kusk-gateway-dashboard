import {useDispatch} from 'react-redux';

import {Typography} from 'antd';

import _ from 'lodash';

import {useAppSelector} from '@redux/hooks';
import {updateStaticRouteSettings} from '@redux/reducers/main';

import {SubHeading} from '@components/AntdCustom';
import {TargetCard} from '@components/Target';

import * as S from './PathTarget.styled';

const PathTarget = () => {
  const dispatch = useDispatch();
  const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);

  const target =
    (Object.values(selectedRouteSpec.spec.paths[selectedRoutePath])[0] as any)?.redirect ||
    _.pick<any>(Object.values(selectedRouteSpec.spec.paths[selectedRoutePath])[0], 'route.upstream').route.upstream;
  const targetType = 'host_redirect' in target ? 'redirect' : 'upstream';

  const onSaveClickHandler = (values: any) => {
    const {upstream, redirect = null} = values;
    const {service = null, host = null} = upstream || {};
    const pathMethods = Object.keys(selectedRouteSpec.spec.paths[selectedRoutePath]).reduce((acc: any, key: any) => {
      let method = JSON.parse(JSON.stringify(selectedRouteSpec?.spec?.paths[selectedRoutePath][key]));
      method = _.merge(method, {
        route: {
          upstream: {
            service,
            host,
          },
        },
        redirect,
      });

      acc[key] = method;
      return acc;
    }, {});

    dispatch(
      updateStaticRouteSettings({
        editedOpenapi: {
          paths: {
            [selectedRoutePath]: pathMethods,
          },
        },
      })
    );
  };

  return (
    <>
      <S.Header>
        <SubHeading>
          Define the the upstreams or redirects your API is routing the requests to.&nbsp;
          <Typography.Link href="https://kubeshop.github.io/kusk-gateway/reference/extension/#upstream" target="_blank">
            Learn more
          </Typography.Link>
        </SubHeading>
      </S.Header>
      <TargetCard target={targetType === 'redirect' ? {redirect: target} : target} onSave={onSaveClickHandler} />
    </>
  );
};
export default PathTarget;
