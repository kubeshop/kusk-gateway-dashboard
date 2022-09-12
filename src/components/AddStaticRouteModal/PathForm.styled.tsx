import {Checkbox as AntCheckbox} from 'antd';

import styled from 'styled-components';

export const CheckboxGroup = styled(AntCheckbox.Group)`
  display: grid;
`;

export const Checkbox = styled(AntCheckbox)`
  margin-left: 0 !important;
  margin-bottom: 16px !important;
`;
