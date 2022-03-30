import {Select as RawSelect} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const EnvoyFleetsListContainer = styled.div`
  padding: 40px 20px 20px 20px;
`;

export const ErrorLabel = styled.span`
  color: red;
`;

export const Select = styled(RawSelect)`
  width: 100%;

  & .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 10px;
`;

export const TitleFiltersContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 200px;
`;

export const TitleLabel = styled.h2`
  color: ${Colors.grey9};
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  white-space: nowrap;
`;
