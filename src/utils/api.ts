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
