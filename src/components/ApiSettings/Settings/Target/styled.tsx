import {Tag} from 'antd';

import styled, {css} from 'styled-components';

export const TargetTag = styled(Tag)<{$type: 'redirect' | 'upstream'}>`
  padding: 4px;

  ${({$type}) => {
    if ($type === 'redirect') {
      return css`
        color: #0369a1;
        background: #e0f2fe;
        border: 1px solid #0ea5e9;
      `;
    }
    if ($type === 'upstream') {
      return css`
        color: #a16207;
        background: #fef9c3;
        border: 1px solid #facc15;
      `;
    }
  }}
`;
