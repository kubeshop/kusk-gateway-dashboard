import {Dispatch, SetStateAction} from 'react';

import {Button, Tag, Typography} from 'antd';

import {ArrowLeftOutlined} from '@ant-design/icons';

import {RawExternalIcon} from '@components/Icons';

import Colors from '@styles/colors';

import * as S from './Policies.styled';

interface IPolicyCard {
  title: string;
  description: string;
  link: string;
  onClick: (e?: any) => void;
}

interface IPoliciesProps {
  isRootPath: boolean;
  selectPolicy: Dispatch<SetStateAction<string | undefined>>;
}

const PolicyCard = ({title, description, link, onClick}: IPolicyCard) => (
  <S.Card hoverable onClick={onClick}>
    <Typography.Title level={4}>{title}</Typography.Title>
    <S.SubHeading>{description}</S.SubHeading>

    <S.Link href={link} target="_blank">
      Learn more <S.Icon component={RawExternalIcon} />
    </S.Link>
  </S.Card>
);

const Policies = ({isRootPath, selectPolicy}: IPoliciesProps) => {
  const onBackClickHandler = () => {
    selectPolicy(undefined);
  };

  const tabsItems = [
    {
      label: <Tag> All policies</Tag>,
      key: 'all',
      children: (
        <div>
          <div>
            <S.H3>Add Request Policy</S.H3>
            <S.Grid>
              <PolicyCard
                title="CORS"
                description="Set cross-origin resource sharing policy to allow cross-domain calls from browser-based clients."
                link="https://docs.kusk.io/extension#cors"
                onClick={() => selectPolicy('cors')}
              />
              <PolicyCard
                title="Rate Limiting"
                description="Set rate-limit policy to manage the number of requests your API receives over time."
                link="https://docs.kusk.io/extension#rate-limiting"
                onClick={() => selectPolicy('rateLimiting')}
              />
              <PolicyCard
                title="Routing"
                description="Set routing policy for request target service via the upstream or redirect property."
                link="https://docs.kusk.io/guides/routing"
                onClick={() => selectPolicy('routing')}
              />
              <PolicyCard
                title="Validation"
                description="Set validation policy to validate incoming requests against the corresponding OpenAPI definition."
                link="https://docs.kusk.io/extension#validation"
                onClick={() => selectPolicy('validation')}
              />

              <PolicyCard
                title="Quality of Service"
                description="Set QoS policy to specify configuations such as timeouts an retries."
                link="https://docs.kusk.io/extension#qos"
                onClick={() => selectPolicy('qos')}
              />

              <PolicyCard
                title="Websocket"
                description="Set websocket policy to enable handling of “Upgrade:websocket” and other actions."
                link="https://docs.kusk.io/extension#websocket"
                onClick={() => selectPolicy('websocket')}
              />
            </S.Grid>
          </div>
          <div>
            <S.H3>Add Response Policy</S.H3>
            <S.Grid>
              <PolicyCard
                title="Caching"
                description="Set response caching policy to reduce the number of endpoint calls and improve latency of requests."
                link="https://docs.kusk.io/extension#caching"
                onClick={() => selectPolicy('caching')}
              />
            </S.Grid>
          </div>
        </div>
      ),
    },
    {
      label: <Tag>Security</Tag>,
      key: 'security',
      children: (
        <>
          <S.H3>Add Request Policy</S.H3>
          <S.Grid>
            <PolicyCard
              title="Custom Authentication"
              description="Bring your own authentication logic or use out-the-box OAuth2 for your APIs."
              link="https://docs.kusk.io/extension#authentication"
              onClick={() => selectPolicy('customAuthentication')}
            />
            <PolicyCard
              title="JWT"
              description="Set JSON Web Token policy to authenticate incoming requests using a bearer token."
              link="https://docs.kusk.io/extension#authentication"
              onClick={() => selectPolicy('jwtAuthentication')}
            />

            {isRootPath && (
              <PolicyCard
                title="Crunch 42"
                description="Set this policy to execute API security checks, provide security scores and remediation advice."
                link="https://docs.kusk.io/guides/security/42crunch"
                onClick={() => selectPolicy('42crunch')}
              />
            )}
          </S.Grid>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={onBackClickHandler} type="link">
        <ArrowLeftOutlined style={{color: Colors.blue400}} />
        Back
      </Button>
      <S.Tabs items={tabsItems} defaultActiveKey="all" />
    </div>
  );
};

export default Policies;
