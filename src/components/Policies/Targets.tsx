import {Form} from 'antd';

import _ from 'lodash';

import {FormCard} from '@components/FormComponents';
import {TargetForm} from '@components/TargetForm';

import * as S from './styled';

interface IProps {
  xKusk: {[key: string]: any};
  onFinish: (values: any) => void;
  onCancel: () => void;
}

const Targets = ({xKusk, onFinish, onCancel}: IProps) => {
  const onSaveClickHandler = (values: any) => {
    let {
      redirect = null,
      upstream: {service = null, host = null, rewrite},
      mocking,
    } = values;
    if (rewrite) {
      rewrite = rewrite?.rewrite_regex;
    }

    if (redirect) {
      redirect.type = undefined;
    }

    const edits = {'x-kusk': {mocking, redirect, upstream: {service, host, rewrite}}};

    onFinish(edits);
  };
  const xKuskForm = _.set(_.cloneDeep(xKusk), 'upstream.rewrite.rewrite_regex', {
    pattern: xKusk?.upstream?.rewrite?.pattern,
    substitution: xKusk?.upstream?.rewrite?.substitution,
  });

  return (
    <FormCard
      enableCancelButton
      heading="Routing"
      subHeading="Define the the upstreams or redirects your API is routing the requests to."
      helpTopic="Routing"
      helpLink="https://docs.kusk.io/guides/routing"
      formProps={{onFinish: onSaveClickHandler, layout: 'vertical', initialValues: xKuskForm}}
      cancelEditMode={onCancel}
    >
      <Form.Item hidden name="mocking" initialValue={null} />
      <TargetForm />
      <S.Divider />
    </FormCard>
  );
};

export default Targets;
