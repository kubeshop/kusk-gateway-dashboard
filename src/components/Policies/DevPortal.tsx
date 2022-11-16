import {Form, Input} from 'antd';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormComponents';

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const DevPortalPolicy = ({xKusk, onFinish, onCancel}: IProps) => {
  return (
    <FormCard
      heading="Developer Portal"
      subHeading="Configure the developer portal for consumers of your API"
      helpTopic="Developer Portal"
      formProps={{layout: 'vertical', onFinish}}
      cancelEditMode={onCancel}
      enableCancelButton
    >
      <Form.Item
        name={['x-kusk', 'dev_portal', 'path']}
        label="Docs pathname"
        initialValue={xKusk?.dev_portal?.path}
        rules={[
          {required: true, message: 'Path is missing.'},
          {type: 'url', message: 'Invalid url.'},
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['x-kusk', 'dev_portal', 'logo_url']}
        label="Favicon URL"
        initialValue={xKusk?.dev_portal?.logo_url}
      >
        <Input />
      </Form.Item>

      <Form.Item name={['x-kusk', 'dev_portal', 'title']} label="Title tag" initialValue={xKusk?.dev_portal?.title}>
        <Input />
      </Form.Item>
      <Divider />
    </FormCard>
  );
};

export default DevPortalPolicy;
