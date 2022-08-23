import styled from 'styled-components';

import {SIDEBAR_WIDTH} from '@constants/constants';

import Colors from '@styles/colors';

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${SIDEBAR_WIDTH}px 1fr;
  height: calc(100vh - 64px);
`;

export const Content = styled.div`
  position: relative;
  background-color: ${Colors.zinc1};
  padding: 32px;
`;
