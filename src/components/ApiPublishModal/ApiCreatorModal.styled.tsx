import {Card as AntCard, Typography} from 'antd';

import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

export const ModalTitle = styled(Typography.Title).attrs({
  level: 2,
})`
  margin-bottom: 32px !important;
`;

export const Heading = styled(Typography.Text)`
  display: block;
  text-align: center;
`;

export const Card = styled(AntCard)`
  .ant-card-cover img {
    width: 60px;
    height: 60px;
    margin: 32px auto 24px !important;
  }

  .ant-card-body {
    padding: 12px 12px 32px !important;
  }

  .ant-card-meta-title {
    text-align: center;
    margin-bottom: 12px !important;
  }

  .ant-card-meta-description {
    text-align: center;
  }
`;

export const Description = styled(Typography.Text).attrs({
  type: 'secondary',
})`
  font-size: 12px;
  line-height: 18px;
`;
