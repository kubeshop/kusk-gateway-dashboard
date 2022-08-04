import {Button} from 'antd';

import styled from 'styled-components';

export const SaveButton = styled(Button).attrs({
  type: 'primary',
})`
  display: block;
  margin-left: auto;
  width: 124px;
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
