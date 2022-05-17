import {useEffect} from 'react';

import {Form, Radio, Switch} from 'antd';

import * as S from './styled';

const {Option} = S.Select;

interface IProps {
  selectedTab: string;
  setSelectedTab: (tabKey: string) => void;
}

const Redirect: React.FC<IProps> = props => {
  const {selectedTab, setSelectedTab} = props;
  const form = Form.useFormInstance();

  useEffect(() => {
    const redirect = undefined;

    if (!redirect) {
      return;
    }

    form.setFieldsValue({redirect});

    if (!redirect['path_redirect'] && redirect['rewrite_regex']) {
      setSelectedTab('rewrite_regex');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Form.Item label="Scheme redirect" name={['redirect', 'scheme_redirect']}>
        <S.Select allowClear placeholder="Select redirect scheme">
          <Option value="http">http</Option>
          <Option value="https">https</Option>
        </S.Select>
      </Form.Item>

      <Form.Item
        label="Host redirect"
        name={['redirect', 'host_redirect']}
        rules={[
          {
            required: true,
            message: 'Please enter name!',
          },
        ]}
      >
        <S.Input placeholder="Host to which requests should be redirected" />
      </Form.Item>

      <Form.Item
        label="Port redirect"
        name={['redirect', 'port_redirect']}
        rules={[
          {
            required: true,
            message: 'Please enter name!',
          },
        ]}
      >
        <S.Input placeholder="Port to which requests should be redirected" type="number" />
      </Form.Item>

      <Form.Item label="Response code" name={['redirect', 'response_code']}>
        <S.Select allowClear placeholder="Select redirect response code">
          <Option value="301">301</Option>
          <Option value="302">302</Option>
          <Option value="303">303</Option>
          <Option value="307">307</Option>
          <Option value="308">308</Option>
        </S.Select>
      </Form.Item>

      <S.RadioGroup value={selectedTab} onChange={e => setSelectedTab(e.target.value)}>
        <Radio value="path_redirect">Path redirect</Radio>
        <Radio value="rewrite_regex">Rewrite regex</Radio>
      </S.RadioGroup>

      {selectedTab === 'path_redirect' ? (
        <Form.Item name={['redirect', 'path_redirect']}>
          <S.Input placeholder="Path to which requests should be redirected" />
        </Form.Item>
      ) : (
        <>
          <Form.Item label="Pattern" name={['redirect', 'rewrite_regex', 'pattern']}>
            <S.Input placeholder="Regex pattern that should be rewritten" />
          </Form.Item>
          <Form.Item label="Substitution" name={['redirect', 'rewrite_regex', 'substitution']}>
            <S.Input placeholder="Substitution for specified regex pattern" />
          </Form.Item>
        </>
      )}

      <Form.Item label="Strip query" name={['redirect', 'strip_query']} valuePropName="checked">
        <Switch />
      </Form.Item>
    </>
  );
};

export default Redirect;
