import {Typography} from 'antd';

import {RawExternalIcon} from '@components/Icons';

import * as S from './Policies.styled';

interface IPolicyCard {
  title: string;
  description: string;
  link: string;
}

const PolicyCard = ({title, description, link}: IPolicyCard) => (
  <S.Card hoverable>
    <Typography.Title level={5}>{title}</Typography.Title>
    <S.SubHeading>{description}</S.SubHeading>

    <Typography.Link href={link} target="_blank">
      Learn more <S.Icon component={RawExternalIcon} />
    </Typography.Link>
  </S.Card>
);

const Policies = () => {
  return (
    <div>
      <div>
        <Typography.Title level={3}>Add Request Policy</Typography.Title>
        <S.Grid>
          <PolicyCard
            title="CORS"
            description="Set cross-origin resource sharing policy to allow cross-domain calls from browser-based clients."
            link="https://docs.kusk.io/extension#cors"
          />
          <PolicyCard
            title="Rate Limiting"
            description="Set rate-limit policy to manage the number of requests your API receives over time."
            link="https://docs.kusk.io/extension#rate-limiting"
          />
          <PolicyCard
            title="Routing"
            description="Set routing policy for request target service via the upstream or redirect property."
            link="https://docs.kusk.io/guides/routing"
          />
          <PolicyCard
            title="Validation"
            description="Set validation policy to validate incoming requests against the corresponding OpenAPI definition."
            link="https://docs.kusk.io/extension#validation"
          />

          <PolicyCard
            title="Quality of Service"
            description="Set QoS policy to specify configuations such as timeouts an retries."
            link="https://docs.kusk.io/extension#qos"
          />

          <PolicyCard
            title="Authentication"
            description="Bring your own authentication logic or use out-the-box OAuth2 for your APIs."
            link="https://docs.kusk.io/extension#authentication"
          />
        </S.Grid>
      </div>
      <div>
        <Typography.Title level={3}>Add Response Policy</Typography.Title>
        <S.Grid>
          <PolicyCard
            title="Mocking"
            description="Set mocking policy to return a response based on the defined samples."
            link="https://docs.kusk.io/extension#mocking"
          />

          <PolicyCard
            title="Caching"
            description="Set response caching policy to reduce the number of endpoint calls and improve latency of requests."
            link="https://docs.kusk.io/extension#caching"
          />
        </S.Grid>
      </div>
    </div>
  );
};

export default Policies;
