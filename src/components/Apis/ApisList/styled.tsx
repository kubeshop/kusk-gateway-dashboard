import {QuestionCircleOutlined as RawQuestionsCircleOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
`;

export const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 296px));
  gap: 24px;

  input::placeholder {
    color: ${Colors.slate300} !important;
  }

  .ant-select-selection-placeholder {
    color: ${Colors.slate300} !important;
  }

  svg {
    color: ${Colors.zinc3};
    margin-right: 4px;
  }
`;

export const QuestionCircleOutlined = styled(RawQuestionsCircleOutlined)`
  cursor: pointer;
`;

export const HelpSection = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 60px;
`;

export const Header = styled.div`
  margin-bottom: 24px;
`;

export const NoResults = styled.div`
  min-width: 100%;
  width: 100%;
  margin-top: 60px;
  text-align: center;

  img {
    display: block;
    margin: 0 auto;
    margin-bottom: 32px;
  }

  h2 {
    margin-bottom: 24px !important;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;
