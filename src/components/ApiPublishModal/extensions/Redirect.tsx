import {useEffect, useMemo} from 'react';

import {Form, FormInstance, Radio, Switch} from 'antd';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

interface IProps {
  form: FormInstance<any>;
  selectedTab: string;
  setSelectedTab: (tabKey: string) => void;
}

const Redirect: React.FC<IProps> = props => {
  const {form, selectedTab, setSelectedTab} = props;

  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi || {});

  const isApiMocked = useMemo(() => {
    if (!openApiSpec) {
      return false;
    }

    const mocking = openApiSpec['x-kusk']?.mocking?.enabled;

    if (mocking) {
      return true;
    }

    return false;
  }, [openApiSpec]);

  useEffect(() => {
    const redirect = openApiSpec['x-kusk'].redirect;

    if (!redirect) {
      return;
    }

    form.setFieldsValue({redirect});

    if (!redirect['path_redirect'] && redirect['rewrite_regex']) {
      setSelectedTab('rewrite_regex');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openApiSpec]);

  return (
    <>
      <Form.Item label="Scheme redirect" name={['redirect', 'scheme_redirect']}>
        <S.Input />
      </Form.Item>

      <Form.Item
        label="Host redirect"
        name={['redirect', 'host_redirect']}
        rules={[
          {
            required: !isApiMocked,
            message: 'Please enter name!',
          },
        ]}
      >
        <S.Input />
      </Form.Item>

      <Form.Item
        label="Port redirect"
        name={['redirect', 'port_redirect']}
        rules={[
          {
            required: !isApiMocked,
            message: 'Please enter name!',
          },
        ]}
      >
        <S.Input type="number" />
      </Form.Item>

      <Form.Item label="Response code" name={['redirect', 'response_code']}>
        <S.Input type="number" />
      </Form.Item>

      <S.RadioGroup value={selectedTab} onChange={e => setSelectedTab(e.target.value)}>
        <Radio value="path_redirect">Path redirect</Radio>
        <Radio value="rewrite_regex">Rewrite regex</Radio>
      </S.RadioGroup>

      {selectedTab === 'path_redirect' ? (
        <Form.Item name={['redirect', 'path_redirect']}>
          <S.Input placeholder="Enter path redirect" />
        </Form.Item>
      ) : (
        <>
          <Form.Item label="Pattern" name={['redirect', 'rewrite_regex', 'pattern']}>
            <S.Input />
          </Form.Item>
          <Form.Item label="Substitution" name={['redirect', 'rewrite_regex', 'substitution']}>
            <S.Input />
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
