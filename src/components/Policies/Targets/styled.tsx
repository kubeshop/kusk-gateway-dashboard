import {Radio, Input as RawInput, Select as RawSelect} from 'antd';

import styled from 'styled-components';

import ExternalLinkIcon from '@components/Icons/ExternalLink';

import Colors from '@styles/colors';

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoLinkIcon = styled(ExternalLinkIcon)`
  vertical-align: middle;
  margin-left: 4px;
`;

export const ExtensionSubHeading = styled.h4`
  font-size: 16px;
`;

export const Input = styled(RawInput)`
  background-color: ${Colors.grey2};
  width: 100%;
`;

export const Label = styled.div`
  margin-bottom: 8px;
`;

export const RadioGroup = styled(Radio.Group)`
  margin-bottom: 15px;
`;

export const Select = styled(RawSelect)`
  background-color: ${Colors.grey2};
`;

export const RedirectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 8px;
`;
