import {Form, Input, Select} from 'antd';

import {useGetNamespacesQuery} from '@redux/services/enhancedApi';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormComponents';

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const CrunchSecurityPolicy = ({xKusk, onFinish, onCancel}: IProps) => {
  const {data: namespaces} = useGetNamespacesQuery();

  return (
    <FormCard
      heading="42Crunch"
      subHeading="Provide the name and namespace of the 42Crunch token you generated"
      helpLink="https://docs.kusk.io/guides/security/42crunch"
      helpTopic="42Crunch"
      enableCancelButton
      cancelEditMode={onCancel}
      formProps={{layout: 'vertical', onFinish, initialValues: xKusk.security?.['42crunch']?.token}}
    >
      <Form.Item
        label="Secret name"
        name={['x-kusk', 'security', '42crunch', 'token', 'name']}
        rules={[{required: true, message: 'Please provide a secret name.'}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Secret namespace"
        name={['x-kusk', 'security', '42crunch', 'token', 'namespace']}
        rules={[{required: true, message: 'Please provide a secret namespace.'}]}
      >
        <Select>
          {namespaces?.map(el => (
            <Select.Option key={el.name} value={el.name}>
              {el.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Divider />
    </FormCard>
  );
};

export default CrunchSecurityPolicy;
