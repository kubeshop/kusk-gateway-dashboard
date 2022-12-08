import {useDispatch} from 'react-redux';

import {Typography} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {updateStaticRouteSettings} from '@redux/reducers/main';

import {SubHeading} from '@components/AntdCustom';
import {CardSkeleton} from '@components/Skeletons';
import {TargetCard} from '@components/Target';

import * as S from './PathTarget.styled';

const PathTarget = () => {
  const dispatch = useDispatch();
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);

  const target = selectedRouteSpec?.spec?.upstream;

  const onSaveClickHandler = (values: any) => {
    const {upstream, redirect = null} = values;
    const {service = null, host = null} = upstream || {};

    dispatch(
      updateStaticRouteSettings({
        editedOpenapi: {
          upstream: {
            service,
            host,
          },

          redirect,
        },
      })
    );
  };

  return !selectedRouteSpec ? (
    <CardSkeleton />
  ) : (
    <>
      <S.Header>
        <SubHeading>
          Define the the upstreams your API is routing the requests to.&nbsp;
          <Typography.Link href="https://docs.kusk.io/guides/routing" target="_blank">
            Learn more
          </Typography.Link>
        </SubHeading>
      </S.Header>
      <TargetCard target={target} onSave={onSaveClickHandler} targetTypes={['service', 'host']} />
    </>
  );
};
export default PathTarget;
