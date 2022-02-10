import styled from 'styled-components';

import Colors from 'src/styles/colors';
import {SIDEBAR_WIDTH} from 'src/constants/constants';

export const Logo = styled.img`
  height: 50px;
  cursor: pointer;
`;

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${SIDEBAR_WIDTH}px;
  background: ${Colors.blackPure};
  padding: 15px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
