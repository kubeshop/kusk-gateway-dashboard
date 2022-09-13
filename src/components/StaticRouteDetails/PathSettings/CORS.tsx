import {useDispatch} from 'react-redux';

import {Form, Input, Switch} from 'antd';

import _ from 'lodash';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';
import {updateStaticRouteSettings} from '@redux/reducers/main';

import {Divider} from '@components/AntdCustom';
import {FormCard} from '@components/FormCard';
import {FormList} from '@components/FormList';

import * as S from './CORS.styled';

const METHODS = SUPPORTED_METHODS.slice(0, -1).map(method => method.toUpperCase());

const CORS = () => {
  const dispatch = useDispatch();
  const selectedRoutePath = useAppSelector(state => state.main.selectedStaticRoutePath);
  const selectedRouteSpec = useAppSelector(state => state.main.selectedStaticRouteSpec);
  const cors = _.pick<any>(Object.values(selectedRouteSpec?.spec?.paths[selectedRoutePath])[0], 'route.cors')?.route
    ?.cors;

  const onSubmitClickHandler = (values: any) => {
    const {
      cors: {origins, methods, credentials, headers, exposed_headers: exposedHeaders, max_age: maxAge},
    } = values;
    const updatedPath = Object.keys(selectedRouteSpec?.spec?.paths[selectedRoutePath]).reduce((acc: any, key: any) => {
      let method = JSON.parse(JSON.stringify(selectedRouteSpec?.spec?.paths[selectedRoutePath][key]));
      method = _.merge(method, {
        route: {
          cors: {
            origins,
            methods,
            credentials,
            headers,
            exposed_headers: exposedHeaders,
            max_age: maxAge,
          },
        },
      });
      acc[key] = method;
      return acc;
    }, {});

    dispatch(
      updateStaticRouteSettings({
        editedOpenapi: {
          paths: {
            [selectedRoutePath]: updatedPath,
          },
        },
      })
    );
  };

  return (
    <S.Container>
      <FormCard
        heading="Origins"
        subHeading="Please provide the CORS origin"
        helpTopic="Origins"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
        formProps={{onFinish: onSubmitClickHandler}}
      >
        <FormList
          addButtonText="Add a new origin"
          label="Origins"
          name={['cors', 'origins']}
          initialValue={cors?.origins}
          requiredMessage="Enter origin or delete the field."
        />
        <Divider />
      </FormCard>

      <FormCard
        heading="Methods"
        subHeading="Which CORS request methods would you like to allow?"
        helpTopic="CORS Request Methods"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
        formProps={{onFinish: onSubmitClickHandler}}
      >
        <Form.Item name={['cors', 'methods']} initialValue={cors?.methods}>
          <S.CheckboxGroup>
            {METHODS.map(method => (
              <S.Checkbox key={method} value={method}>
                {method}
              </S.Checkbox>
            ))}
          </S.CheckboxGroup>
        </Form.Item>
        <Divider />
      </FormCard>

      <FormCard
        heading="Headers"
        subHeading="Please provide the CORS headers"
        helpTopic="Origins"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
        formProps={{onFinish: onSubmitClickHandler}}
      >
        <FormList
          addButtonText="Add a new header"
          label="Headers"
          name={['cors', 'headers']}
          initialValue={cors?.headers}
          requiredMessage="Enter header or delete the field."
        />
        <Divider />
      </FormCard>

      <FormCard
        heading="Exposed Headers"
        subHeading="Please provide the CORS exposed headers"
        helpTopic="Origins"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
        formProps={{onFinish: onSubmitClickHandler}}
      >
        <FormList
          addButtonText="Add a new exposed header"
          label="Headers"
          name={['cors', 'exposed_headers']}
          initialValue={cors?.exposed_headers}
          requiredMessage="Enter header or delete the field."
        />
        <Divider />
      </FormCard>

      <FormCard
        heading="Credentials"
        subHeading="Please provide the Credentials"
        helpTopic="Origins"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
        cardProps={{
          extra: (
            <Form.Item
              label="Credentials"
              name={['cors', 'credentials']}
              valuePropName="checked"
              initialValue={cors?.credentials}
            >
              <Switch />
            </Form.Item>
          ),
        }}
        formProps={{onFinish: onSubmitClickHandler}}
      />

      <FormCard
        heading="CORS Max age"
        subHeading="Please provide the CORS exposed headers"
        helpTopic="Origins"
        helpLink="https://kubeshop.github.io/kusk-gateway/reference/extension/#cors"
        formProps={{layout: 'vertical', onFinish: onSubmitClickHandler}}
      >
        <Form.Item
          label="Max age (in seconds)"
          name={['cors', 'max_age']}
          initialValue={cors?.max_age}
          getValueFromEvent={e => Number(e.target.value)}
        >
          <Input type="number" />
        </Form.Item>
        <Divider />
      </FormCard>
    </S.Container>
  );
};
export default CORS;
