import {Skeleton} from 'antd';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr 1fr;
  gap: 16px;
  height: 100vh;

  .ant-skeleton-content {
    position: relative;
  }
  .ant-skeleton-content ul {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    list-style-type: none;
    display: block;
    float: left;
    height: 100%;
  }

  .ant-skeleton-content ul li {
    width: 100%;
    height: 100% !important;
  }
`;

export const HeaderSkeleton = styled(Skeleton)`
  .ant-skeleton-content {
    position: relative;
  }
  .ant-skeleton-content ul {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    list-style-type: none;
    display: block;
    float: left;
    height: 60px;
  }

  .ant-skeleton-content ul li {
    width: 100%;
    height: 100% !important;
  }
`;

export const SideSkeleton = styled(Skeleton)`
  .ant-skeleton-content {
    position: relative;
  }
  .ant-skeleton-content ul {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 64px;
    width: 100%;
    list-style-type: none;
    display: block;
    float: left;
    height: 100%;
  }

  .ant-skeleton-content ul li {
    width: 100%;
    height: 100%;
  }
`;
