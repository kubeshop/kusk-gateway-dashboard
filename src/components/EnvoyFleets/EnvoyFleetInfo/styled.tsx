import {CloseOutlined as RawCloseOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

export const CloseOutlined = styled(RawCloseOutlined)`
  position: absolute;
  right: 20px;
  top: 20px;
  color: ${Colors.grey0};
  font-size: 18px;
  cursor: pointer;
`;

export const EnvoyFleetInfoContainer = styled.div`
  height: 100%;
  position: relative;
  background: ${Colors.grey4};
  padding: 40px 20px 20px 20px;
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-row-gap: 30px;
  overflow-y: auto;

  ${GlobalScrollbarStyle};
`;
