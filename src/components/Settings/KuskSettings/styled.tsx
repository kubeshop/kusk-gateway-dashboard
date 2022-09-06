import styled from 'styled-components';

export const Divider = styled.div`
  display: block;
  position: relative;
  margin: 16px 0;
  height: 8px;
  &::before {
    content: '';
    position: absolute;
    left: -24px;
    right: -24px;
    top: 0;
    height: 1px;
    background-color: #f0f0f0;
  }
`;
