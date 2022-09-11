import {useDispatch} from 'react-redux';

import {Checkbox, Form, Input} from 'antd';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';
import {updateStaticRouteSettings} from '@redux/reducers/main';
import {closeStaticRoutePathModal} from '@redux/reducers/ui';

import * as S from './styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1);

const AddPathModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);

  const onSubmitHandler = async () => {
    const {path, methods} = await form.validateFields();
    dispatch(
      updateStaticRouteSettings({
        editedOpenapi: {
          paths: {
            [path]: methods.reduce((acc: any, item: any) => {
              acc[item] = {};
              return acc;
            }, {}),
          },
        },
      })
    );
    dispatch(closeStaticRoutePathModal());
  };

  const onBackHandler = () => {
    dispatch(closeStaticRoutePathModal());
  };

  return (
    <S.Modal visible title="Add Path" width="608px" onCancel={onBackHandler} onOk={onSubmitHandler} okText="Add Path">
      <Form layout="vertical" form={form}>
        <Form.Item
          name="path"
          label="Path"
          rules={[
            {required: true},
            {
              validator(rule, value) {
                if (!Object.keys(selectedRouteSpec?.spec?.paths).includes(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('This path is exist'));
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Methods" name="methods" rules={[{required: true}]}>
          <Checkbox.Group style={{display: 'grid'}}>
            {METHODS.map(method => (
              <Checkbox style={{marginLeft: 0, marginBottom: 16}} key={method} value={method}>
                {method.toUpperCase()}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </S.Modal>
  );
};

export default AddPathModal;
