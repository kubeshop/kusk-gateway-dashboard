import {Typography} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/colors';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const PolicyChip = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border: 1px solid ${Colors.grey10};
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 16px;
`;

export const Title = styled(Typography.Text)`
  color: ${Colors.zinc9};
  font-size: 16px;
  line-height: 24px;
  margin-right: 32px;
`;

export const Path = styled(Typography.Text)`
  color: ${Colors.zinc9};
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  margin-right: 16px;
`;
