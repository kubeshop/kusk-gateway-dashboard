import styled from 'styled-components';

import {SIDEBAR_WIDTH} from '@constants/constants';

import Colors from '@styles/colors';

export const Wrapper = styled.div`
  overflow-y: auto;
  height: 100vh;
  position: sticky;
  top: 0;
`;

export const Container = styled.div`
  display: grid;
  align-items: stretch;
  grid-template-columns: ${SIDEBAR_WIDTH}px 1fr;
  position: sticky;
  top: 0;
`;

export const Content = styled.div`
  position: relative;
  background-color: ${Colors.zinc1};
  min-height: calc(100vh - 60px);
  padding: 0;
  overflow-y: auto;
`;
