import {SUPPORTED_METHODS} from '@constants/constants';

import {ApiItem, ApiItemFleet} from '@redux/services/kuskApi';

export const getApiKey = (api: ApiItem | ApiItemFleet | null) => (api ? `${api.namespace}-${api.name}` : '');

export const getUniqueNamespaces = (apis: {namespace: string}[]) => {
  return [...Array.from(new Set(apis.map(el => el.namespace)))];
};

export const checkDuplicateAPI = (apis: ApiItem[], apiKey: string) =>
  apis.find(api => `${api.namespace}-${api.name}` === apiKey);

export const formatApiName = (name: string) =>
  name
    ? name
        .trim()
        .replace(/[\W_]+/g, '-')
        .toLowerCase()
    : '';

export const findResponseExample = (key: string, children: any, check: {hasExample: boolean}) => {
  if ((key === 'example' && children) || (key === 'examples' && children && Object.entries(children).length)) {
    check.hasExample = true;
    return;
  }

  if (children && typeof children === 'object') {
    Object.entries(children).forEach(([k, c]) => findResponseExample(k, c, check));
  }
};

export const checkMockingExamples = (spec: {[key: string]: any}) => {
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
