import {Typography} from 'antd';

import {ArrowLeftOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Wrapper = styled.div`
  overflow-y: auto;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: ${Colors.zinc1};
  position: sticky;
  top: 0;
`;

export const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(20%, 190px) 1fr;
  margin-top: 60px;
`;

export const List = styled.ul`
  position: sticky;
  top: 0;
  list-style-type: none;
`;

export const ListItem = styled.li<{$selected: boolean}>`
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${({$selected}) => ($selected ? Colors.zinc9 : Colors.zinc6)};
  cursor: pointer;

  :hover {
    color: black;
  }
`;

export const Content = styled.div`
  position: sticky;
  top: 60px;
  flex-grow: 1;
  align-self: flex-start;
  padding: 20px;
  padding-right: 40px;
  overflow-y: auto;
  min-height: calc(100vh - 60px);
`;

export const PathSettingsContainer = styled.div`
  align-self: stretch;
  width: 33%;
  padding: 20px;
  background-color: ${Colors.zinc5};
  overflow: auto;
`;

export const ArrowLeftOutlinedIcon = styled(ArrowLeftOutlined)`
  color: ${Colors.blue500};
  margin-right: 20px;
`;

export const Title = styled(Typography.Title)`
  margin: 16px 0 !important;
`;
