import {Modal as RawModal} from 'antd';

import {QuestionCircleOutlined as RawQuestionsCircleOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

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

export const QuestionCircleOutlined = styled(RawQuestionsCircleOutlined)`
  margin-left: 5px;
  cursor: pointer;
`;
