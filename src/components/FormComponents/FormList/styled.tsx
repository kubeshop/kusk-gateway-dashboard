import {Input as RawInput, Space as RawSpace} from 'antd';

import styled from 'styled-components';

export const Label = styled.div`
  margin-bottom: 10px;
`;

export const Input = styled(RawInput)`
  width: 100%;
`;

export const Space = styled(RawSpace)`
  display: flex;
  margin-bottom: 5px;

  & .ant-space-item:first-child {
    width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
