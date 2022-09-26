import {Button, Typography} from 'antd';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

export const PublishApiButton = styled(Button).attrs({
  type: 'primary',
})`
  margin-top: 24px;
  margin-bottom: 48px;
`;
