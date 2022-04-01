import {Tag as RawTag} from 'antd';

import {RightOutlined as RawRightOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FalseTag = styled(RawTag)`
  color: ${Colors.magenta2};
  background: ${Colors.magenta0};
  border: 2px solid ${Colors.magenta1};
`;

export const RightOutlined = styled(RawRightOutlined)<{$disabled: boolean}>`
  ${({$disabled}) => `
    cursor: ${$disabled ? 'not-allowed' : 'pointer'} !important;
    color: ${$disabled ? Colors.grey5 : Colors.whitePure};
  `}
  font-size: 20px;
`;

export const TrueTag = styled(RawTag)`
  color: ${Colors.cyan2};
  background: ${Colors.cyan0};
  border: 2px solid ${Colors.cyan1};
`;
