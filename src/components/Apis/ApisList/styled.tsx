import {QuestionCircleOutlined as RawQuestionsCircleOutlined} from '@ant-design/icons';

import styled from 'styled-components';

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
`;

export const FiltersContainer = styled.div`
  width: 500px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  flex-wrap: wrap;
  gap: 20px;
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
