import {Form, Input} from 'antd';

import {Divider} from '@components/AntdCustom';
import {FormCard, FormList} from '@components/FormComponents';

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const JWTAuthentication = ({xKusk, onFinish, onCancel}: IProps) => {
  const currentProvider = xKusk?.auth?.jwt?.providers[0];

  const onFinishClickHandler = (values: any) => {
    onFinish({
      'x-kusk': {
        auth: {jwt: {providers: [values]}},
      },
    });
  };

  return (
    <FormCard
      heading="JWT"
      subHeading="Configure JSON Web Token"
      helpTopic="JSON Web Tokens"
      enableCancelButton
      cancelEditMode={onCancel}
      formProps={{layout: 'vertical', onFinish: onFinishClickHandler, initialValues: currentProvider}}
    >
      <Form.Item label="Provider name" name="name" rules={[{required: true, message: 'Please input'}]}>
        <Input placeholder="Provider name" />
      </Form.Item>
      <Form.Item label="Issuer" name="issuer" rules={[{type: 'url'}, {required: true, message: 'Please input'}]}>
        <Input placeholder="Issuer" />
      </Form.Item>
      <FormList addButtonText="Add audience" label="Audience" name="audiences" />

      <Form.Item label="JWKS Url" name="jwks" rules={[{type: 'url'}, {required: true, message: 'Please input'}]}>
        <Input placeholder="Remote JWKS to use for verifying JWT signatures." />
      </Form.Item>
      <Divider />
    </FormCard>
  );
};

export default JWTAuthentication;
