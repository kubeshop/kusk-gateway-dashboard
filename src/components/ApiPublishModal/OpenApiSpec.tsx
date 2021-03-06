import {useMemo, useState} from 'react';

import {Checkbox, Form} from 'antd';

import YAML from 'yaml';

import {SUPPORTED_METHODS} from '@constants/constants';

import * as S from './OpenApiSpec.styled';

interface IProps {}

const OpenApiSpec: React.FC<IProps> = () => {
  const form = Form.useFormInstance();
  const isApiMocked = Form.useWatch(['mocking', 'enabled']);

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
            <a
              href="https://kubeshop.github.io/kusk-gateway/reference/extension/#mocking"
              target="_blank"
              rel="noopener noreferrer"
            >
              mocking examples!
            </a>
          </div>
        ))}
      </S.WarningsContainer>
    );
  }, [isApiMocked, warnings]);

  const copyXKuskToForm = (spec: string) => {
    const openapi = YAML.parse(spec);
    form.setFieldsValue({...openapi['x-kusk']});
  };

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
          placeholder="OpenAPI Spec in YAML/JSON format"
          onChange={e => {
            const spec = e.target.value;

            if (!spec) {
              setWarnings([]);
            } else {
              copyXKuskToForm(spec);
              setWarnings(checkMockingExamples(YAML.parse(JSON.parse(JSON.stringify(spec)))));
            }
          }}
        />
      </Form.Item>

      {renderedWarnings}

      <Form.Item name={['mocking', 'enabled']} valuePropName="checked">
        <Checkbox>Enable mocking</Checkbox>
      </Form.Item>
    </>
  );
};

const findResponseExample = (key: string, children: any, check: {hasExample: boolean}) => {
  if ((key === 'example' && children) || (key === 'examples' && children && Object.entries(children).length)) {
    check.hasExample = true;
    return;
  }

  if (children && typeof children === 'object') {
    Object.entries(children).forEach(([k, c]) => findResponseExample(k, c, check));
  }
};

const checkMockingExamples = (spec: {[key: string]: any}) => {
  const paths = spec.paths;

  if (!paths) {
    return [];
  }

  let warnings: string[] = [];

  Object.entries(paths).forEach((pathEntry: [string, any]) => {
    const [path, pathValue] = pathEntry;

    // mocking kusk extension from path level
    const pathMocking = pathValue['x-kusk']?.mocking?.enabled;

    if (pathMocking !== false) {
      Object.entries(pathValue)
        .filter(entry => SUPPORTED_METHODS.includes(entry[0]))
        .forEach((operationEntry: [string, any]) => {
          const [operation, operationValue] = operationEntry;

          // mocking kusk extension from operation level
          const operationMocking = operationValue['x-kusk']?.mocking?.enabled;
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
            warnings.push(`${path} -> ${operation} is missing `);
          }
        });
    }
  });

  return warnings;
};

export default OpenApiSpec;
