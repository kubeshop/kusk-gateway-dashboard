import {Select as RawSelect} from 'antd';

import styled from 'styled-components';

export const Select = styled(RawSelect)`
  width: 100%;
  max-width: 300px;
  min-width: 150px;

  & .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
`;

export const TitleFiltersContainer = styled.div`
  width: 100%;
  display: flex;
`;
