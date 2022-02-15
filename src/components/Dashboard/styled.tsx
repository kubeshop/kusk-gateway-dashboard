import styled from 'styled-components';

import Colors from 'src/styles/colors';

export const APIsContainer = styled.div`
  margin: 20px 0px;
  border: 1px solid ${Colors.grey2};
`;

export const DashboardContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px 20px 20px 20px;

  background: ${Colors.grey0};
`;

export const DashboardTitle = styled.h2`
  color: ${Colors.grey9};
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
`;

export const ErrorLabel = styled.span`
  color: red;
`;
