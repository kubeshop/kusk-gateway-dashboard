import {Modal as AntModal, Segmented as AntSegmented} from 'antd';

import styled from 'styled-components';

import {GlobalScrollbarStyle} from '@utils/scrollbar';

export const Segmented = styled(AntSegmented)``;

export const Modal = styled(AntModal)`
  & .ant-modal-body {
    max-height: 80vh;
    overflow-y: auto;
    ${GlobalScrollbarStyle}
  }
`;
