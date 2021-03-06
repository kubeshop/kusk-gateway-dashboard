import {Select as RawSelect} from 'antd';

import styled from 'styled-components';

export const Select = styled(RawSelect)`
  width: 100%;
  max-width: 250px;
`;

export const TitleFiltersContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
