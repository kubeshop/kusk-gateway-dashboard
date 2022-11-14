import {Form, Input} from 'antd';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormComponents';

const DevPortalSettings = () => {
  return (
    <FormCard
      heading="Developer Portal"
      subHeading="Configure the developer portal for consumers of your API"
      helpTopic="Developer Portal"
      formProps={{layout: 'vertical'}}
    >
      <Form.Item name="path" label="Docs pathname">
        <Input />
      </Form.Item>

      <Form.Item name="logo_url" label="Favicon URL">
        <Input />
      </Form.Item>

      <Form.Item name="title" label="Title tag">
        <Input />
      </Form.Item>
      <Divider />
    </FormCard>
  );
};
export default DevPortalSettings;
