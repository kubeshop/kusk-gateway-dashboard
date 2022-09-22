import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

export const Container = styled.div`
  background-color: transparent;

  height: 100%;
  position: relative;
  padding: 40px 20px 20px 20px;
  overflow-y: auto;

  ${GlobalScrollbarStyle};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;
