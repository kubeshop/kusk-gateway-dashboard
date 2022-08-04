import {Card as AntCard, Typography} from 'antd';

import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 24px;
`;

export const Heading = styled(Typography.Text)`
  display: block;
  text-align: center;
`;

export const Card = styled(AntCard)`
  .ant-card-cover img {
    width: 60px;
    height: 60px;
    margin: 32px auto 0;
  }

  .ant-card-meta-title {
    text-align: center;
  }

  .ant-card-meta-description {
    text-align: center;
  }
`;
