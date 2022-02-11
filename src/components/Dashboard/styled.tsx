import styled from 'styled-components';

import {Table as RawTable, Tag as RawTag} from 'antd';

import Colors from 'src/styles/colors';

export const APIsContainer = styled.div`
  margin-top: 20px;
  border: 1px solid ${Colors.grey2};
`;

export const DashboardContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px 20px 20px 20px;

  background: ${Colors.grey0};
`;

export const DashboardTitle = styled.h2`
  color: ${Colors.grey9};
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
`;

export const Table = styled(RawTable)`
  border: 1px solid ${Colors.grey2};

  & .ant-table-thead {
    background: ${Colors.grey1};
  }

  & .ant-table-tbody > tr:hover > td {
    background: ${Colors.grey0};
  }

  & .ant-table-thead > tr > th {
    background: ${Colors.grey1};
    color: ${Colors.grey9};
    border-bottom: 1px solid ${Colors.grey2};
  }

  & .ant-table-tbody > tr > td {
    background: ${Colors.grey0};
    border-bottom: 1px solid ${Colors.grey2};
    color: ${Colors.grey9};
  }
`;

export const FalseTag = styled(RawTag)`
  color: ${Colors.magenta2};
  background: ${Colors.magenta0};
  border: 2px solid ${Colors.magenta1};
`;

export const TrueTag = styled(RawTag)`
  color: ${Colors.cyan2};
  background: ${Colors.cyan0};
  border: 2px solid ${Colors.cyan1};
`;
