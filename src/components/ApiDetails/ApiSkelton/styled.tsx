import styled from 'styled-components';

import {SIDEBAR_WIDTH} from '@constants/constants';

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${SIDEBAR_WIDTH}px 1fr;
  gap: 16px;
  padding: 72px 16px;
`;
