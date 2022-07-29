import {useState} from 'react';

import {Card, Input, Typography} from 'antd';

import {DeleteOutlined} from '@ant-design/icons';

import {CardHeading} from '@components/AntdCustom';

import * as S from './styled';

const Hosts = () => {
  const [hosts] = useState<string[]>([]);
  return (
    <Card title={<CardHeading heading="Hosts" subHeading="Configure which domains your api should listen to" />}>
      {hosts.map(host => (
        <S.Row key={host}>
          <Input value={host} />
          <DeleteOutlined />
        </S.Row>
      ))}

      <S.AddButton>Add a new host</S.AddButton>

      <S.Divider />
      <S.CardActions>
        <Typography.Text type="secondary">
          Learn more about&nbsp;
          <Typography.Link href="https://kubeshop.github.io/kusk-gateway/reference/extension/#hosts" target="_blank">
            Hosts
          </Typography.Link>
        </Typography.Text>
        <S.SaveButton>Save</S.SaveButton>
      </S.CardActions>
    </Card>
  );
};

export default Hosts;
