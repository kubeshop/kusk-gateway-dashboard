import {ApiItem, EnvoyFleetItem} from './api';

export interface ApisTableDataSourceItem {
  key: string;
  name: string;
  version: string;
  apiItem: ApiItem;
}

export interface EnvoyFleetsTableDataSourceItem {
  key: string;
  name: string;
  namespace: string;
  envoyFleetItem: EnvoyFleetItem;
}
export interface KuskExtensionsItem {
  id: string;
  kuskExtension: any[];
  path: string;
  method?: string;
  tag?: string;
}

export type ApiInfoTabs = 'raw-api-spec' | 'post-processed-api-spec' | 'kusk-extensions';
