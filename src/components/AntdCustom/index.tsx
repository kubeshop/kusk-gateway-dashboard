import {Menu as RawMenu, Typography} from 'antd';

import {
  CloseOutlined as RawCloseOutlined,
  DeleteOutlined as RawDeleteOutlined,
  SettingOutlined as RawSettingOutlined,
} from '@ant-design/icons';

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
  color: ${Colors.grey0};
  font-size: 18px;
  cursor: pointer;
  :hover {
    color: ${Colors.whitePure};
  }
`;

export const InfoPanelSettingsIcon = styled(RawSettingOutlined)`
  color: ${Colors.grey0};
  font-size: 24px;
  cursor: pointer;
  :hover {
    color: ${Colors.whitePure};
  }
`;

export const InfoPanelDeleteIcon = styled(RawDeleteOutlined)`
  font-size: 18px;
`;

export const InfoActionMenu = styled(RawMenu)`
  &.ant-menu-dark {
    background: unset;
  }
`;

export const InfoPanelActions = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  align-items: center;
`;

export const InfoPaneContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-row-gap: 30px;
`;

export const PageTitle = styled(Typography.Title).attrs({
  level: 2,
})`
  font-size: 20px;
  white-space: nowrap;
  margin-bottom: 20px;
`;

const SubHeading = styled(Typography.Text)`
  color: ${Colors.zinc6};
  font-size: 14px;
  line-height: 16px;
`;

export const CardHeading = ({heading, subHeading}: {heading: string; subHeading: string}) => {
  return (
    <>
      <Typography.Title level={5}>{heading}</Typography.Title>
      <SubHeading>{subHeading}</SubHeading>
    </>
  );
};
