import {Button, Form} from 'antd';

import _ from 'lodash';

import {TargetType} from '@models/ui';

import {FormCard} from '@components/FormComponents';

import Mocking from './Targets/Mocking';
import Redirect from './Targets/Redirect';
import Upstream from './Targets/Upstream';

import * as S from './styled';

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const Targets = ({xKusk, onFinish, onCancel}: IProps) => {
  const [form] = Form.useForm();

  const routingType: TargetType = xKusk?.mocking
    ? 'mocked'
    : xKusk?.redirect
    ? 'redirect'
    : xKusk?.upstream?.host
    ? 'host'
    : 'service';

  const targetSelection = Form.useWatch<TargetType>('type', form);

  const xKuskForm = _.set(_.cloneDeep(xKusk), 'upstream.rewrite.rewrite_regex', {
    pattern: xKusk?.upstream?.rewrite?.pattern,
    substitution: xKusk?.upstream?.rewrite?.substitution,
  });

  const onSaveClickHandler = (values: any) => {
    let {redirect = null, upstream: {service = null, host = null, rewrite = null} = {}, mocking = null} = values;
    if (rewrite) {
      rewrite = rewrite?.rewrite_regex;
    }

    if (redirect) {
      redirect.type = undefined;
    }

    if (!redirect && !service && !host) {
      mocking = {enabled: true};
    }

    const edits = {'x-kusk': {mocking, redirect, upstream: {service, host, rewrite}}};

    onFinish(edits);
  };

  const changeRoutingType = (type: TargetType) => {
    if (type === 'mocked') {
      return {
        type,
        'x-kusk': {
          upstream: null,
          redirect: null,
          mocking: {
            enabled: true,
          },
        },
      };
    }
    if (type === 'redirect') {
      return {
        type,
        'x-kusk': {
          upstream: null,
          mocking: null,
          redirect: xKusk?.redirect,
        },
      };
    }

    if (type === 'host') {
      return {
        type,
        'x-kusk': {
          upstream: {service: null, host: xKusk?.upstream?.host},
          mocking: null,
          redirect: null,
        },
      };
    }
    if (type === 'service') {
      return {
        type,
        'x-kusk': {
          upstream: {host: null, service: xKusk?.upstream?.service},
          mocking: null,
          redirect: null,
        },
      };
    }
  };

  return (
    <FormCard
      enableCancelButton
      heading="Routing"
      subHeading="Define the the upstreams or redirects your API is routing the requests to."
      helpTopic="Routing"
      helpLink="https://docs.kusk.io/guides/routing"
      formProps={{
        form,
        onFinish: onSaveClickHandler,
        layout: 'vertical',
        initialValues: {type: routingType, ...xKuskForm},
      }}
      cancelEditMode={onCancel}
    >
      <Form.Item label="Type" name="type">
        <Button.Group>
          <Button
            type={targetSelection === 'service' ? 'primary' : undefined}
            onClick={() => {
              form.setFieldsValue(changeRoutingType('service'));
            }}
            value="Upstream service"
          >
            Upstream service
          </Button>
          <Button
            type={targetSelection === 'host' ? 'primary' : undefined}
            onClick={() => form.setFieldsValue(changeRoutingType('host'))}
            value="Upstream host"
          >
            Upstream host
          </Button>
          <Button
            type={targetSelection === 'redirect' ? 'primary' : undefined}
            onClick={() => form.setFieldsValue(changeRoutingType('redirect'))}
            value="Redirect"
          >
            Redirect
          </Button>
          <Button
            type={targetSelection === 'mocked' ? 'primary' : undefined}
            onClick={() => form.setFieldsValue(changeRoutingType('mocked'))}
            value="Mocking"
          >
            Mock
          </Button>
        </Button.Group>
      </Form.Item>
      {(targetSelection === 'service' || targetSelection === 'host') && (
        <Upstream reference={targetSelection === 'service' ? 'service' : 'host'} isRequiredFields />
      )}
      {targetSelection === 'redirect' && <Redirect isRequiredFields />}
      {targetSelection === 'mocked' && <Mocking />}

      <S.Divider />
    </FormCard>
  );
};

export default Targets;
