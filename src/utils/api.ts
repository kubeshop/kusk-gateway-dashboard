import {ApiItem, ApiItemFleet} from '@models/api';

export const getApiKey = (api: ApiItem | ApiItemFleet | null) => (api ? `${api.namespace}-${api.name}` : '');

export const getUniqueNamespaces = (apis: {namespace: string}[]) => {
  return [...Array.from(new Set(apis.map(el => el.namespace)))];
};
