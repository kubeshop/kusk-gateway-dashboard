import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  padding: 24px 32px;
`;

export const SettingsContainer = styled.div`
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
