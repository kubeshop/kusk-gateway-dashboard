export const getOperationId = (path: string, method: string, operation: any): string => {
  if (operation['operationId']) {
    return operation['operationId'];
  }

  const reconstructedPathId = path.replaceAll('{', '_').replaceAll('}', '_').replaceAll('/', '_');

  return `${method}${reconstructedPathId}`;
};
