import {Select as RawSelect} from 'antd';

import {QuestionCircleOutlined as RawQuestionsCircleOutlined} from '@ant-design/icons';

import styled from 'styled-components';

export const EnvoyFleetFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const QuestionCircleOutlined = styled(RawQuestionsCircleOutlined)`
  cursor: pointer;
`;

export const Select = styled(RawSelect)`
  width: 100%;

  & .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
`;

export const TitleFiltersContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 300px));
  grid-gap: 20px;
`;
