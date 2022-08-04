import {Checkbox, Form, InputNumber, Select, Switch, Typography} from 'antd';

import styled from 'styled-components';

import {useAppSelector} from '@redux/hooks';

import {FormCard} from '@components/FormCard';

import * as S from './styled';

const CardLayout = styled.div`
  display: grid;
  grid-template-columns: 40% 40% 20%;
  grid-gap: 12px;
`;

const RateLimiting = () => {
  const selectedAPIOpenSpec = useAppSelector(state => state.main.selectedApiOpenapiSpec);
  const xKusk = selectedAPIOpenSpec['x-kusk'];
  return (
    <FormCard
      heading="Rate Limiting"
      subHeading="Limit the amount of requests this API should handle"
      helpTopic="Rate Limiting"
      helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#rate-limiting"
      cardProps={{
        extra: (
          <Form.Item
            label="Enable"
            name={['rateLimit', 'enabled']}
            valuePropName="checked"
            initialValue={Boolean(xKusk['rate_limit'])}
          >
            <Switch />
          </Form.Item>
        ),
      }}
    >
      <CardLayout>
        <S.CardItem>
          <Typography.Text>Requests per unit</Typography.Text>
          <Form.Item
            name={['rateLimit', 'requests_per_unit']}
            initialValue={(xKusk['rate_limit'] && xKusk['rate_limit']['requests_per_unit']) || 60}
          >
            <InputNumber />
          </Form.Item>
        </S.CardItem>

        <S.CardItem>
          <Typography.Text>Time unit</Typography.Text>
          <Form.Item
            name={['rateLimit', 'unit']}
            initialValue={(xKusk['rate_limit'] && xKusk['rate_limit']['unit']) || 'second'}
          >
            <Select>
              <Select.Option value="second">Second</Select.Option>
              <Select.Option value="minute">Minute</Select.Option>
              <Select.Option value="hour">Hour</Select.Option>
            </Select>
          </Form.Item>
        </S.CardItem>

        <S.CardItem>
          <Typography.Text>Response code</Typography.Text>
          <Form.Item
            name={['rateLimit', 'response_code']}
            initialValue={(xKusk['rate_limit'] && xKusk['rate_limit']['response_code']) || 405}
          >
            <InputNumber />
          </Form.Item>
        </S.CardItem>
      </CardLayout>
      <Form.Item
        name={['rateLimit', 'per_connection']}
        valuePropName="checked"
        initialValue={(xKusk['rate_limit'] && xKusk['rate_limit']['per_connection']) || false}
      >
        <Checkbox>Apply these limits for each individual connection only</Checkbox>
      </Form.Item>
      <S.Divider />
    </FormCard>
  );
};

export default RateLimiting;
