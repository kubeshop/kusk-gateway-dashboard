import {ApiItem, ApiItemFleet} from '@models/api';

export const getApiKey = (api: ApiItem | ApiItemFleet | null) => (api ? `${api.namespace}-${api.name}` : '');
