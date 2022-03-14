export const getOperationId = (path: string, method: string, operation: any): string => {
  const reconstructedPath = path.substring(1).replaceAll('{', '').replaceAll('}', '');
  let reconstructedPathId = reconstructedPath.replaceAll('/', '__');

  if (operation.parameters) {
    reconstructedPathId += '_';
  }

  return operation['operationId'] || `${method}_${reconstructedPathId}`;
};
