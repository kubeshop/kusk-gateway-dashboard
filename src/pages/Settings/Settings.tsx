import {useTracking} from 'react-tracking';

import {Button, Form, Input} from 'antd';

import {AlertEnum} from '@models/alert';
import {ANALYTIC_TYPE, Events} from '@models/analytics';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAlert} from '@redux/reducers/alert';
import {setApiEndpoint} from '@redux/reducers/main';

import {ContentWrapper, PageTitle} from '@components/AntdCustom';

import * as S from './styled';

const Settings: React.FC = () => {
  const {Track} = useTracking({page: Events.SETTINGS_PAGE, type: ANALYTIC_TYPE.PAGE}, {dispatchOnMount: true});
  const dispatch = useAppDispatch();
  const apiEndpoint = useAppSelector(state => state.main.apiEndpoint);

  const [form] = Form.useForm();

  const onFinishHandler = (values: any) => {
    dispatch(setApiEndpoint(values.apiEndpoint));
    dispatch(setAlert({title: `API endpoint was successfully set to ${values.apiEndpoint}`, type: AlertEnum.Success}));
  };

  return (
    <Track>
      <ContentWrapper>
        <PageTitle>Settings</PageTitle>

        <S.Form form={form} initialValues={{apiEndpoint}} layout="vertical" onFinish={onFinishHandler}>
          <Form.Item label="API Endpoint" name="apiEndpoint" rules={[{required: true}]}>
            <Input placeholder="Enter API endpoint" type="text" />
          </Form.Item>

          <Button htmlType="submit" type="primary">
            Apply
          </Button>
        </S.Form>
      </ContentWrapper>
    </Track>
  );
};

export default Settings;
