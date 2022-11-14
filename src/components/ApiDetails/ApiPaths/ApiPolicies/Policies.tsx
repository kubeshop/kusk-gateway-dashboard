import {Dispatch, SetStateAction} from 'react';

import {Button, Typography} from 'antd';

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

const PolicyCard = ({title, description, link, onClick}: IPolicyCard) => (
  <S.Card hoverable onClick={onClick}>
    <Typography.Title level={4}>{title}</Typography.Title>
    <S.SubHeading>{description}</S.SubHeading>

    <S.Link href={link} target="_blank">
      Learn more <S.Icon component={RawExternalIcon} />
    </S.Link>
  </S.Card>
);

interface IPoliciesProps {
  selectPolicy: Dispatch<SetStateAction<string | undefined>>;
}

const Policies = ({selectPolicy}: IPoliciesProps) => {
  const onBackClickHandler = () => {
    selectPolicy(undefined);
  };

  return (
    <div>
      <Button onClick={onBackClickHandler} type="link">
        <ArrowLeftOutlined style={{color: Colors.blue400}} />
        Back
      </Button>
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
            title="Developer Portal"
            description="Create interactive documentation for consumers of your API with the Kusk developer portal."
            link="https://docs.kusk.io/guides/portal"
            onClick={() => selectPolicy('devPortal')}
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
            title="Authentication"
            description="Bring your own authentication logic or use out-the-box OAuth2 for your APIs."
            link="https://docs.kusk.io/extension#authentication"
            onClick={() => selectPolicy('authentication')}
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
  );
};

export default Policies;
