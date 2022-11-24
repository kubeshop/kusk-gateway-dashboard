import {useDispatch} from 'react-redux';

import {Form, Input} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {updateApiSettings} from '@redux/reducers/main';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormComponents';

const DevPortalSettings = () => {
  const dispatch = useDispatch();
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec && selectedAPIOpenSpec['x-kusk'];

  const onFinishClickHandler = (values: any) => {
    dispatch(updateApiSettings({editedOpenapi: values}));
  };

  return (
    <FormCard
      heading="Developer Portal"
      subHeading="Configure the developer portal for consumers of your API"
      helpTopic="Developer Portal"
      formProps={{layout: 'vertical', onFinish: onFinishClickHandler}}
    >
      <Form.Item
        name="path"
        label="Docs pathname"
        rules={[
          {required: true, message: 'Path is missing.'},
          {type: 'url', message: 'Invalid url.'},
        ]}
        initialValue={xKusk?.dev_portal?.path}
      >
        <Input />
      </Form.Item>

      <Form.Item name="logo_url" label="Favicon URL" initialValue={xKusk?.dev_portal?.logo_url}>
        <Input />
      </Form.Item>

      <Form.Item name="title" label="Title tag" initialValue={xKusk?.dev_portal?.title}>
        <Input />
      </Form.Item>
      <Divider />
    </FormCard>
  );
};
export default DevPortalSettings;
