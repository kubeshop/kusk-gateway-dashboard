import styled from 'styled-components';

import Colors from '@styles/colors';

export const AddDeploymentOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  &::before {
    content: '';
    position: absolute;
    height: 1px;
    left: 0;
    right: 0;
    top: 0;
    background-color: ${Colors.zinc2};
  }
`;
