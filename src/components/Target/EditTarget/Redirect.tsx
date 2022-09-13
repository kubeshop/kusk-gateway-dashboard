import {Form, Input, Radio, Select, Switch} from 'antd';

import * as S from './styled';

const {Option} = Select;

interface IProps {
  isRequiredFields: boolean;
  target: any;
}

const Redirect: React.FC<IProps> = props => {
  const {isRequiredFields, target} = props;
  const selectedTab = Form.useWatch(['redirect', 'type']);
  return (
    <>
      <S.RedirectGrid>
        <Form.Item
          label="Scheme redirect"
          name={['redirect', 'scheme_redirect']}
          initialValue={target?.redirect?.scheme_redirect}
        >
          <Select allowClear placeholder="ex: https">
            <Option value="http">http</Option>
            <Option value="https">https</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Host redirect"
          name={['redirect', 'host_redirect']}
          initialValue={target?.redirect?.host_redirect}
          rules={[
            {
              required: isRequiredFields,
              message: 'Please enter name!',
            },
          ]}
        >
          <Input placeholder="Host to which requests should be redirected" />
        </Form.Item>

        <Form.Item
          label="Port redirect"
          name={['redirect', 'port_redirect']}
          initialValue={target?.redirect?.port_redirect}
          getValueFromEvent={e => Number(e.target.value)}
          rules={[
            {
              required: isRequiredFields,
              message: 'Please enter name!',
            },
          ]}
        >
          <Input placeholder="ex: 8080" type="number" />
        </Form.Item>
      </S.RedirectGrid>
      <Form.Item
        label="Response code"
        name={['redirect', 'response_code']}
        initialValue={target?.redirect?.response_code}
      >
        <Select allowClear placeholder="Select redirect response code">
          <Option value={301}>301</Option>
          <Option value={302}>302</Option>
          <Option value={303}>303</Option>
          <Option value={307}>307</Option>
          <Option value={308}>308</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['redirect', 'type']} initialValue={target?.redirect?.type}>
        <S.RadioGroup>
          <Radio value="path_redirect">Path redirect</Radio>
          <Radio value="rewrite_regex">Rewrite regex</Radio>
        </S.RadioGroup>
      </Form.Item>
      {selectedTab === 'path_redirect' ? (
        <Form.Item name={['redirect', 'path_redirect']} label="Path Redirect">
          <Input placeholder="Path to which requests should be redirected" />
        </Form.Item>
      ) : (
        <>
          <Form.Item
            label="Pattern"
            name={['redirect', 'rewrite_regex', 'pattern']}
            initialValue={target?.rewrite_regex?.pattern}
          >
            <Input placeholder="Regex pattern that should be rewritten" />
          </Form.Item>
          <Form.Item label="Substitution" name={['redirect', 'rewrite_regex', 'substitution']}>
            <Input placeholder="Substitution for specified regex pattern" />
          </Form.Item>
        </>
      )}

      <Form.Item
        label="Strip query"
        name={['redirect', 'strip_query']}
        valuePropName="checked"
        initialValue={target?.redirect?.strip_query}
      >
        <Switch />
      </Form.Item>
    </>
  );
};

export default Redirect;
