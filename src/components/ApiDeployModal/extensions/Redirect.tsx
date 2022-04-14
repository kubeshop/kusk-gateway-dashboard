import {useEffect} from 'react';

import {Form, FormInstance, Switch, Tabs} from 'antd';

import {useAppSelector} from '@redux/hooks';

import * as S from './styled';

const {TabPane} = Tabs;

interface IProps {
  form: FormInstance<any>;
  selectedTab: string;
  setSelectedTab: (tabKey: string) => void;
}

const Redirect: React.FC<IProps> = props => {
  const {form, selectedTab, setSelectedTab} = props;

  const openApiSpec = useAppSelector(state => state.main.newApiContent?.openapi) || {};

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

      <Form.Item label="Host redirect" name={['redirect', 'host_redirect']}>
        <S.Input />
      </Form.Item>

      <Form.Item label="Port redirect" name={['redirect', 'port_redirect']}>
        <S.Input type="number" />
      </Form.Item>

      <Form.Item label="Response code" name={['redirect', 'response_code']}>
        <S.Input type="number" />
      </Form.Item>

      <Tabs activeKey={selectedTab} onChange={key => setSelectedTab(key)}>
        <TabPane tab="Path redirect" key="path_redirect">
          <Form.Item name={['redirect', 'path_redirect']}>
            <S.Input placeholder="Enter path redirect" />
          </Form.Item>
        </TabPane>

        <TabPane tab="Rewrite regex" key="rewrite_regex">
          <Form.Item label="Pattern" name={['redirect', 'rewrite_regex', 'pattern']}>
            <S.Input />
          </Form.Item>

          <Form.Item label="Substitution" name={['redirect', 'rewrite_regex', 'substitution']}>
            <S.Input />
          </Form.Item>
        </TabPane>
      </Tabs>

      <Form.Item label="Strip query" name={['redirect', 'strip_query']} valuePropName="checked">
        <Switch />
      </Form.Item>
    </>
  );
};

export default Redirect;
