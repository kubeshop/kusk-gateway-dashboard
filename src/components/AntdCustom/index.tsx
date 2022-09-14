import {ReactNode} from 'react';

import {Menu as RawMenu, Tag, Typography} from 'antd';

import {
  CloseOutlined as RawCloseOutlined,
  DeleteOutlined as RawDeleteOutlined,
  SettingOutlined as RawSettingOutlined,
} from '@ant-design/icons';

import styled, {css} from 'styled-components';

import {TargetType} from '@models/ui';

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
  color: ${Colors.pink500};
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
  /* white-space: nowrap; */
  margin-bottom: 20px;
`;

export const SubHeading = styled(Typography.Text)`
  color: ${Colors.zinc6};
  font-size: 14px;
  line-height: 16px;
  width: 100%;
`;

export const CardHeading = ({heading, subHeading}: {heading: string | ReactNode; subHeading: string | ReactNode}) => {
  return (
    <>
      <Typography.Title style={{marginBottom: 8}} level={5}>
        {heading}
      </Typography.Title>
      <SubHeading>{subHeading}</SubHeading>
    </>
  );
};

export const TargetTag = styled(Tag)<{$type: TargetType}>`
  padding: 4px;
  margin-left: 8px;
  vertical-align: middle;
  ${({$type}) => {
    if ($type === 'redirect') {
      return css`
        color: #0369a1;
        background: #e0f2fe;
        border: 1px solid #0ea5e9;
      `;
    }
    if ($type === 'host') {
      return css`
        color: #a16207;
        background: #fef9c3;
        border: 1px solid #facc15;
      `;
    }
    if ($type === 'service') {
      return css`
        color: #d97706;
        background: #fef3c7;
        border: 1px solid #fbbf24;
      `;
    }
    if ($type === 'mocked') {
      return css`
        color: #059669;
        background: #d1fae5;
        border: 1px solid #10b981;
      `;
    }
  }}
`;

export const MethodTag = styled(Tag)<{$method: string}>`
  padding: 4px;
  text-transform: uppercase;
  ${({$method}) => {
    if ($method === 'get') {
      return css`
        color: #4d7c0f;
        background: #ecfccb;
        border: 1px solid #84cc16;
      `;
    }
    if ($method === 'delete') {
      return css`
        color: #be185d;
        background: #fce7f3;
        border: 1px solid #ec4899;
      `;
    }
    if ($method === 'post') {
      return css`
        color: #0369a1;
        background: #e0f2fe;
        border: 1px solid #0ea5e9;
      `;
    }
    if ($method === 'put') {
      return css`
        color: #a16207;
        background: #fef9c3;
        border: 1px solid #facc15;
      `;
    }
  }}
`;

export const Divider = styled.div`
  display: block;
  position: relative;
  margin: 16px 0;
  height: 8px;
  &::before {
    content: '';
    position: absolute;
    left: -24px;
    right: -24px;
    top: 0;
    height: 1px;
    background-color: #f0f0f0;
  }
`;
