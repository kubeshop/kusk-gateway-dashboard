import {Button, Form, Input} from 'antd';

import {AlertEnum} from '@models/alert';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {setApiEndpoint} from '@redux/reducers/main';

import {ContentWrapper} from '@components/AntdCustom';

import * as S from './styled';

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const apiEndpoint = useAppSelector(state => state.main.apiEndpoint);

  const [form] = Form.useForm();

  const onFinishHandler = (values: any) => {
    dispatch(setApiEndpoint(values.apiEndpoint));
    dispatch(setAlert({title: `API endpoint was successfully set to ${values.apiEndpoint}`, type: AlertEnum.Success}));
  };

  return (
    <ContentWrapper>
      <S.Form form={form} initialValues={{apiEndpoint}} layout="vertical" onFinish={onFinishHandler}>
        <Form.Item label="API Endpoint" name="apiEndpoint" rules={[{required: true}]}>
          <Input placeholder="Enter API endpoint" type="text" />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          Apply
        </Button>
      </S.Form>
    </ContentWrapper>
  );
};

export default Settings;
