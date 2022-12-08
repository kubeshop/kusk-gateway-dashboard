import {useState} from 'react';

import {Button, Form, Input, Switch, Tag} from 'antd';

import {TargetType} from '@models/ui';

import {CardHeading, SubHeading, TargetTag} from '@components/AntdCustom';

import {EditTarget} from './EditTarget';

import * as S from './styled';

interface IProps {
  target: any;
  onSave: (values: any) => void;
  onDelete?: () => void;
  targetTypes?: TargetType[];
}

const TargetCard = ({target, onSave, onDelete, targetTypes}: IProps) => {
  const [isViewMode, setIsViewMode] = useState<boolean>(true);

  const onEditClickHandler = () => {
    setIsViewMode(!isViewMode);
  };

  const type: TargetType = target?.redirect ? 'redirect' : target?.service ? 'service' : 'host';
  const title = type === 'redirect' ? 'Redirect' : type === 'service' ? 'Upstream Service' : 'Upstream Host';

  const subHeading =
    type === 'redirect' ? (
      <SubHeading>
        <Tag>{target?.redirect?.response_code}</Tag>
        {`${target?.redirect?.host_redirect}:${target?.redirect?.port_redirect}`}
      </SubHeading>
    ) : type === 'service' ? (
      <SubHeading>
        <Tag>{target?.service?.namespace}</Tag>
        {target?.service?.name}
        &nbsp;&nbsp;
        {`:${target?.service?.port}`}
      </SubHeading>
    ) : (
      <SubHeading>{`${target?.host?.hostname}:${target?.host?.port}`}</SubHeading>
    );

  return isViewMode ? (
    <S.Card
      title={
        <CardHeading
          heading={
            <S.Heading>
              {title}
              <TargetTag $type={type}>{title}</TargetTag>
            </S.Heading>
          }
          subHeading={subHeading}
        />
      }
      extra={<Button onClick={onEditClickHandler}>Edit</Button>}
    >
      <Form disabled layout="vertical">
        <Form.Item label="Rewrite pattern" initialValue={target?.rewrite_regex?.pattern || target?.rewrite?.pattern}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Rewrite substitution"
          initialValue={target?.rewrite_regex?.substitution || target?.rewrite?.substitution}
        >
          <Input />
        </Form.Item>
        {type === 'redirect' && (
          <Form.Item valuePropName="checked" initialValue={target?.strip_query}>
            <Switch />
          </Form.Item>
        )}
      </Form>
    </S.Card>
  ) : (
    <EditTarget
      target={target}
      type={type}
      dismissEditMode={setIsViewMode}
      onSave={onSave}
      onDelete={onDelete}
      targetTypes={targetTypes}
    />
  );
};

export default TargetCard;
