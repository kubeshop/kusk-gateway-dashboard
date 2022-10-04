import {Typography} from 'antd';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  place-items: center;
  gap: 24px;
  padding: 60px 0;
`;

export const H2 = styled(Typography.Title).attrs({
  level: 2,
})`
  margin: 24px 0 !important;
  text-align: center;
`;

export const Heading = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
`;
