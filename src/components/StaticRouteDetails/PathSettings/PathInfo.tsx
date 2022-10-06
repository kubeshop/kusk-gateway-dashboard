import {useDispatch} from 'react-redux';

import {Form, Input} from 'antd';

import _ from 'lodash';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';
import {updateStaticRouteSettings} from '@redux/reducers/main';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormComponents';

import * as S from './PathInfo.styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1);

const PathInfo = () => {
  const dispatch = useDispatch();
  const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);
  const methods = Object.keys(selectedRouteSpec?.spec?.paths[selectedRoutePath] || {});

  const target =
    (Object.values(selectedRouteSpec?.spec?.paths[selectedRoutePath])[0] as any)?.redirect ||
    _.pick<any>(Object.values(selectedRouteSpec?.spec?.paths[selectedRoutePath])[0], 'route.upstream').route.upstream;
  const targetType = 'host_redirect' in target ? 'redirect' : 'upstream';

  const onSubmitClickHandler = (values: any) => {
    const {path, methods: updatedMethods} = values;

    const deletedMethods = methods.reduce((acc: any, item: any) => {
      acc[item] = null;
      return acc;
    }, {});

    const pathMethods = updatedMethods.reduce((acc: any, item: any) => {
      acc[item] = targetType === 'upstream' ? {route: {upstream: target}} : {redirect: target};
      return acc;
    }, deletedMethods);

    dispatch(
      updateStaticRouteSettings({
        editedOpenapi: {
          paths: {
            [selectedRoutePath]: null,
            [path]: {
              ...pathMethods,
            },
          },
        },
      })
    );
  };

  return (
    <FormCard
      heading="Paths"
      subHeading="Enter the paths to match. A static route must contain at least one path."
      formProps={{layout: 'vertical', onFinish: onSubmitClickHandler}}
    >
      <Form.Item
        name="path"
        label="Path"
        initialValue={selectedRoutePath}
        rules={[
          {required: true},
          {pattern: /^\/.+$/, message: 'Path must begin with a forward slash “/”'},
          {pattern: /^\/[/.a-zA-Z0-9-]+$/, message: 'Please enter a valid path'},
          () => {
            return {
              validator(arg, value) {
                const existPaths = Object.keys(selectedRouteSpec?.spec?.paths);
                if (!existPaths.includes(value) && selectedRoutePath !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(Error('Path already exists'));
              },
            };
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Divider />

      <Form.Item label="Operations" name="methods" rules={[{required: true}]} initialValue={['get', ...methods]}>
        <S.Checkbox.Group style={{display: 'grid'}}>
          {METHODS.map(method => (
            <S.Checkbox style={{marginLeft: 0, marginTop: 16}} key={method} value={method} disabled={method === 'get'}>
              {method.toUpperCase()}
            </S.Checkbox>
          ))}
        </S.Checkbox.Group>
      </Form.Item>
      <Divider />
    </FormCard>
  );
};
export default PathInfo;
