import {Modal as RawModal} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div``;

export const InputLabel = styled.label`
  color: ${Colors.whitePure};
  font-size: 12px;
`;

export const Modal = styled(RawModal)`
  & .ant-modal-content {
    background: ${Colors.grey4};

    & .ant-modal-close {
      color: ${Colors.whitePure};
    }
  }

  & .ant-modal-header {
    background: ${Colors.grey4};

    & .ant-modal-title {
      color: ${Colors.whitePure};
    }
  }
`;
