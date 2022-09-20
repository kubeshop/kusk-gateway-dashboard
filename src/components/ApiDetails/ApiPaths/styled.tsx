import {Tag as AntTag} from 'antd';

import styled, {css} from 'styled-components';

export const Container = styled.div`
  padding: 24px 32px;
`;

export const FiltersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(40%, 150px));
  grid-gap: 24px;
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin: 40px 0;
`;

export const Tag = styled(AntTag)<{$method: string}>`
  padding: 4px;

  ${({$method}) => {
    if ($method === 'get') {
      return css`
        color: #4d7c0f;
        background: #ecfccb;
        border: 1px solid #84cc16;
      `;
    }
    if ($method === 'delete') {
      return css`
        color: #be185d;
        background: #fce7f3;
        border: 1px solid #ec4899;
      `;
    }
    if ($method === 'post') {
      return css`
        color: #0369a1;
        background: #e0f2fe;
        border: 1px solid #0ea5e9;
      `;
    }
    if ($method === 'put') {
      return css`
        color: #a16207;
        background: #fef9c3;
        border: 1px solid #facc15;
      `;
    }
  }}
`;
