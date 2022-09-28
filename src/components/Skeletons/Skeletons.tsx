import {Skeleton} from 'antd';

import styled from 'styled-components';

export const GridItemSkeleton = styled(Skeleton).attrs({
  title: false,
  loading: true,
  active: true,
  paragraph: {
    rows: 1,
    width: '100%',
  },
})`
  .ant-skeleton-content .ant-skeleton-paragraph > li {
    height: 128px;
  }
`;

export const CardSkeleton = styled(Skeleton).attrs({
  title: false,
  loading: true,
  active: true,
  paragraph: {
    rows: 1,
    width: '100%',
  },
})`
  .ant-skeleton-content .ant-skeleton-paragraph > li {
    height: 270px;
  }
`;

export const TableSkeleton = styled(Skeleton).attrs({
  title: {width: '100%'},
  loading: true,
  active: true,
  paragraph: {
    rows: 4,
    width: '100%',
  },
})`
  .ant-skeleton-content .ant-skeleton-title {
    height: 72px;
  }

  .ant-skeleton-content .ant-skeleton-paragraph > li {
    height: 48px;
  }
`;
