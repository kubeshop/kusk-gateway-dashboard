import {useEffect, useMemo, useState} from 'react';

import {Checkbox, Form, FormInstance} from 'antd';

import YAML from 'yaml';

import {SUPPORTED_METHODS} from '@constants/constants';

import {useAppSelector} from '@redux/hooks';

import * as S from './OpenApiSpec.styled';

interface IProps {
  form: FormInstance<any>;
  isApiMocked: boolean;
  setIsApiMocked: (value: boolean) => void;
}

const OpenApiSpec: React.FC<IProps> = props => {
  const {form, isApiMocked, setIsApiMocked} = props;

  const apiContent = useAppSelector(state => state.main.newApiContent);

  const [warnings, setWarnings] = useState<string[]>([]);

  const renderedWarnings = useMemo(() => {
    if (!isApiMocked || !warnings.length) {
      return null;
    }

    return (
      <S.WarningsContainer>
        {warnings.map(warning => (
          <div key={warning}>
            <S.ExclamationCircleOutlined />
            {warning}
          </div>
        ))}
      </S.WarningsContainer>
    );
  }, [isApiMocked, warnings]);

  useEffect(() => {
    if (!apiContent) {
      return;
    }

    const mocking = apiContent.openapi['x-kusk']?.mocking;

    if (mocking) {
      form.setFieldsValue({mocking});
    }

    form.setFieldsValue({openapi: YAML.stringify(apiContent.openapi)});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiContent]);

  return (
    <>
      <Form.Item
        label="OpenAPI Spec"
        name="openapi"
        rules={[
          {
            required: true,
            message: 'Please enter your API content!',
          },
          () => {
            return {
              validator(_, value) {
                if (typeof YAML.parse(JSON.parse(JSON.stringify(value))) === 'object') {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Please enter a valid API content!'));
              },
            };
          },
        ]}
      >
        <S.Textarea
          rows={15}
          placeholder="Enter OpenAPI Spec in YAML/JSON format"
          onChange={e => {
            const spec = e.target.value;

            if (!spec) {
              setWarnings([]);
            } else {
              setWarnings(checkMockingExamples(YAML.parse(JSON.parse(JSON.stringify(spec)))));
            }
          }}
        />
      </Form.Item>

      {renderedWarnings}

      <Form.Item name={['mocking', 'enabled']} valuePropName="checked">
        <Checkbox onChange={e => setIsApiMocked(e.target.checked)}>Enable mocking</Checkbox>
      </Form.Item>
    </>
  );
};

const findResponseExample = (key: string, children: any, check: {hasExample: boolean}) => {
  if ((key === 'example' && children) || (key === 'examples' && children.length)) {
    check.hasExample = true;
    return;
  }

  if (typeof children === 'object') {
    Object.entries(children).forEach(([k, c]) => findResponseExample(k, c, check));
  }
};

const checkMockingExamples = (spec: {[key: string]: any}) => {
  const paths = spec.paths;

  let warnings: string[] = [];

  Object.entries(paths).forEach((pathEntry: [string, any]) => {
    const [path, pathValue] = pathEntry;

    const pathMocking = pathValue['x-kusk']?.mocking.enabled;

    if (pathMocking !== false) {
      Object.entries(pathValue)
        .filter(entry => SUPPORTED_METHODS.includes(entry[0]))
        .forEach((operationEntry: [string, any]) => {
          const [operation, operationValue] = operationEntry;

          const operationMocking = operationValue['x-kusk']?.mocking.enabled;
          let missingExamplesCount = 0;

          if (operationMocking !== false) {
            Object.entries(operationValue.responses).forEach((responseEntry: [string, any]) => {
              const [responseCode, responseValue] = responseEntry;

              if (parseInt(responseCode, 10) < 300) {
                let check = {hasExample: false};

                findResponseExample(responseCode, responseValue, check);

                if (!check.hasExample) {
                  missingExamplesCount += 1;
                }
              }
            });
          }

          if (missingExamplesCount) {
            warnings.push(`${path} -> ${operation} is missing mocking examples!`);
          }
        });
    }
  });

  return warnings;
};

export default OpenApiSpec;
