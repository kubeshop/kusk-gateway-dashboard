import {Form, Input} from 'antd';

import {useAppSelector} from '@redux/hooks';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormComponents';

const DevPortalSettings = () => {
  const selectedApi = useAppSelector(state => state.main.selectedApi);
  const devPortalEndpoint = useAppSelector(state => state.main.devPortalEndpoint);

  const portalURL = `${devPortalEndpoint}?name=${selectedApi?.name}&namespace=${selectedApi?.namespace}`;

  return (
    <FormCard
      heading="Developer Portal"
      subHeading="Configure the developer portal for consumers of your API"
      helpTopic="Developer Portal"
      formProps={{layout: 'vertical', disabled: true}}
      isViewMode
    >
      <Form.Item
        name="path"
        label="Docs pathname"
        rules={[
          {required: true, message: 'Path is missing.'},
          {type: 'url', message: 'Invalid url.'},
        ]}
        initialValue={portalURL}
      >
        <Input />
      </Form.Item>

      <Divider />
    </FormCard>
  );
};
export default DevPortalSettings;
