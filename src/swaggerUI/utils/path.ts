export const getPathId = (path: string): string => {
  return path.substring(1).replaceAll('{', '').replaceAll('}', '').replaceAll('/', '-');
};
