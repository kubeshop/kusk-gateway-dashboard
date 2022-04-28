import {CloseOutlined as RawCloseOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

import Colors from '@styles/colors';

export const ContentWrapper = styled.div<{$backgroundColor?: string}>`
  ${({$backgroundColor}) => `
    background-color: ${$backgroundColor || 'transparent'};
  `}

  height: 100%;
  position: relative;
  padding: 40px 20px 20px 20px;
  overflow-y: auto;

  ${GlobalScrollbarStyle};
`;

export const ErrorLabel = styled.span`
  color: ${Colors.rose500};
`;

export const InfoPaneCloseIcon = styled(RawCloseOutlined)`
  position: absolute;
  right: 20px;
  top: 20px;
  color: ${Colors.grey0};
  font-size: 18px;
  cursor: pointer;
`;

export const InfoPaneContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-row-gap: 30px;
`;

export const PageTitle = styled.h2`
  color: ${Colors.grey9};
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  white-space: nowrap;
  margin-bottom: 20px;
`;
