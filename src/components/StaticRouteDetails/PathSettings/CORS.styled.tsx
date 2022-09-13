import {Checkbox as AntCheckbox} from 'antd';

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  gap: 20px;
`;

export const CheckboxGroup = styled(AntCheckbox.Group)`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }
`;

export const Checkbox = styled(AntCheckbox)``;
