import {Typography} from 'antd';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  padding-top: 72px;
`;

export const H2 = styled(Typography.Title).attrs({
  level: 2,
})`
  max-width: 375px;
  margin: 24px 0 !important;
  font-size: 28px !important;
  line-height: 32px !important;
  text-align: center;
`;

export const Description = styled(Typography.Text)`
  width: 340px;
  text-align: center;
  font-size: 14px;
  line-height: 22px;
  opacity: 0.6;
`;
